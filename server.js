// Core Module Imports
const express = require("express");
const path = require("path");
require("dotenv").config();

// Third-party Module Imports
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Custom Module Imports
const contentService = require("./content-service");

// Constants
const HTTP_PORT = process.env.PORT || 4250;
const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5MB limit for Vercel deployment
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Initialize Express App
const app = express();

// View Engine Setup
app.set("view engine", "ejs");

// Middleware Configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer Configuration
const upload = multer({
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(new Error("Only JPG, PNG, and GIF images are allowed"));
      return;
    }

    if (parseInt(req.headers["content-length"]) > MAX_FILE_SIZE) {
      cb(new Error("File size exceeds 4.5MB limit for deployment"));
      return;
    }

    cb(null, true);
  },
}).single("featureImage");

// Custom Upload Handler
const handleUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.redirect(
          "/articles/add?error=" +
            encodeURIComponent(
              "File size must be less than 4.5MB for deployment"
            )
        );
      }
      return res.redirect(
        "/articles/add?error=" + encodeURIComponent("Error uploading file")
      );
    } else if (err) {
      return res.redirect(
        "/articles/add?error=" + encodeURIComponent(err.message)
      );
    }
    next();
  });
};

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Route Handlers

// Home Route
app.get("/", (req, res) => {
  res.render("home", { path: "/" });
});

// About Route
app.get("/about", (req, res) => {
  res.render("about", { path: "/about" });
});

// Articles Routes
app.get("/articles", async (req, res) => {
  try {
    const { category, minDate } = req.query;
    let articles;

    if (category) {
      articles = await contentService.getArticlesByCategory(parseInt(category));
    } else if (minDate) {
      articles = await contentService.getArticlesByMinDate(minDate);
    } else {
      articles = await contentService.getAllArticles();
    }

    res.render("articles", {
      articles,
      path: "/articles",
      error: null,
    });
  } catch (err) {
    res.render("articles", {
      articles: [],
      path: "/articles",
      error: err.message || "Unable to fetch articles",
    });
  }
});

// Categories Route
app.get("/categories", async (req, res) => {
  try {
    const categories = await contentService.getCategories();
    res.render("categories", {
      categories,
      path: "/categories",
      error: null,
    });
  } catch (err) {
    res.render("categories", {
      categories: [],
      path: "/categories",
      error: err.message || "Unable to fetch categories",
    });
  }
});

// Add Article Routes
app.get("/articles/add", async (req, res) => {
  try {
    const categories = await contentService.getCategories();
    res.render("addArticle", {
      path: "/articles/add",
      categories,
      error: req.query.error,
    });
  } catch (err) {
    res.render("addArticle", {
      path: "/articles/add",
      categories: [],
      error: err.message,
    });
  }
});

// Single Article Route
app.get("/article/:id", async (req, res) => {
  try {
    const article = await contentService.getArticleById(
      parseInt(req.params.id)
    );
    if (!article) {
      return res.render("article", {
        article: null,
        path: "/articles",
        error: "Article not found",
      });
    }
    res.render("article", {
      article,
      path: "/articles",
      error: null,
    });
  } catch (err) {
    res.render("article", {
      article: null,
      path: "/articles",
      error: "Unable to fetch article",
    });
  }
});

// Edit Article Route
app.get("/articles/edit/:id", async (req, res) => {
  try {
    const [article, categories] = await Promise.all([
      contentService.getArticleById(parseInt(req.params.id)),
      contentService.getCategories(),
    ]);

    if (!article) {
      return res.render("editArticle", {
        article: null,
        categories: [],
        path: "/articles",
        error: "Article not found",
      });
    }

    res.render("editArticle", {
      article,
      categories,
      path: "/articles",
      error: null,
    });
  } catch (err) {
    res.render("editArticle", {
      article: null,
      categories: [],
      path: "/articles",
      error: "Unable to fetch article",
    });
  }
});

// Add Article POST Handler
app.post("/articles/add", handleUpload, (req, res) => {
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "gif"],
          max_bytes: MAX_FILE_SIZE,
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  const processArticle = async (imageUrl) => {
    try {
      const articleData = {
        ...req.body,
        featureImage: imageUrl,
      };
      await contentService.addArticle(articleData);
      res.redirect("/articles");
    } catch (err) {
      res.redirect(
        "/articles/add?error=" +
          encodeURIComponent(err.message || "Error creating article")
      );
    }
  };

  if (req.file) {
    streamUpload(req)
      .then((uploaded) => processArticle(uploaded.url))
      .catch((error) => {
        res.redirect(
          "/articles/add?error=" + encodeURIComponent(error.message)
        );
      });
  } else {
    processArticle("");
  }
});

// Update Article Route
app.put("/articles/:id", upload, async (req, res) => {
  try {
    let imageUrl = undefined;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
            max_bytes: MAX_FILE_SIZE,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      imageUrl = result.url;
    }

    const articleData = {
      ...req.body,
      featureImage: imageUrl,
    };

    const article = await contentService.updateArticle(
      req.params.id,
      articleData
    );
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error updating article" });
  }
});

// Delete Article Route
app.delete("/articles/:id", async (req, res) => {
  try {
    await contentService.deleteArticle(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Error deleting article" });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404", { path: null });
});

// Initialize Server
contentService
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(
        `Express http server is running on http://localhost:${HTTP_PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Error initializing content service:", err);
    process.exit(1);
  });
