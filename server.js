/*
 * Student Name: Nirajan Bist
 * Student Number: 157716226
 * Email: nbist1@myseneca.ca
 * Date Created: 2024/10/04
 * Last Modified: 2024/11/21
 */

// dotenv configuration
require("dotenv").config();

//require the express module
const express = require("express");

//require the path module
const path = require("path");

//get the app object from express
const app = express();

//require the content-service module
const contentService = require("./content-service");

//get the port from the environment variable
const HTTP_PORT = process.env.PORT || 4250;

// File size limit (4.5MB) for vercel deployment
const MAX_FILE_SIZE = 4.5 * 1024 * 1024;

// Allowed image MIME types
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif"];

// modules for the add post form
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Set the view engine to ejs
app.set("view engine", "ejs");

//Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer configuration with strict file size limit
const upload = multer({
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    // Check file type first
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(new Error("Only JPG, PNG, and GIF images are allowed"));
      return;
    }

    // Then check file size
    if (parseInt(req.headers["content-length"]) > MAX_FILE_SIZE) {
      cb(new Error("File size exceeds 4.5MB limit for deployment"));
      return;
    }

    cb(null, true);
  },
}).single("featureImage");

// Custom error handling middleware for multer
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

//Cloudinary config
cloudinary.config({
  cloud_name: "doupy867d",
  api_key: "937327957236582",
  api_secret: "7VM1-mzRECI77BU_xkSbYPMi81g",
  secure: true,
});

//Home route
app.get("/", (req, res) => {
  res.render("home", { path: "/" });
});

//About route
app.get("/about", (req, res) => {
  res.render("about", { path: "/about" });
});

//Updated /articles route with query parameters
// app.get("/articles", async (req, res) => {
//   try {
//     const { category, minDate } = req.query;
//     let articles;

//     if (category) {
//       articles = await contentService.getArticlesByCategory(parseInt(category));
//     } else if (minDate) {
//       articles = await contentService.getArticlesByMinDate(minDate);
//     } else {
//       articles = await contentService.getAllArticles();
//     }

//     res.render("articles", {
//       articles,
//       path: "/articles",
//       error: null,
//     });
//   } catch (err) {
//     res.render("articles", {
//       articles: [],
//       path: "/articles",
//       error: err.message || "Unable to fetch articles",
//     });
//   }
// });
app.get("/articles", async (req, res) => {
  try {
    const { category, minDate } = req.query;
    let articles;

    if (category) {
      articles = await contentService.getArticlesByCategory(parseInt(category));
      if (!articles || articles.length === 0) {
        return res.render("articles", {
          articles: [],
          path: "/articles",
          error: `No articles found for category ${category}`,
          req: req,
        });
      }
    } else if (minDate) {
      articles = await contentService.getArticlesByMinDate(minDate);
    } else {
      articles = await contentService.getAllArticles();
    }

    // Filter out unpublished articles
    articles = articles.filter((article) => article.published);

    res.render("articles", {
      articles,
      path: "/articles",
      error: null,
      req: req,
    });
  } catch (err) {
    res.render("articles", {
      articles: [],
      path: "/articles",
      error: err.message || "Unable to fetch articles",
      req: req,
    });
  }
});

//Categories route
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

//Add post route
app.get("/articles/add", async (req, res) => {
  try {
    const categories = await contentService.getCategories();
    res.render("addArticle", { path: "/articles/add", categories });
  } catch (err) {
    res.render("addArticle", {
      path: "/articles/add",
      categories: [],
      error: err,
    });
  }
});

// New route to get article by ID
app.get("/article/:id", async (req, res) => {
  try {
    const article = await contentService.getArticleById(
      parseInt(req.params.id)
    );

    if (!article) {
      return res.render("articles", {
        articles: [],
        path: "/articles",
        error: "Article not found",
        req: req,
      });
    }

    if (!article.published) {
      return res.render("articles", {
        articles: [],
        path: "/articles",
        error: "Article is not published",
        req: req,
      });
    }

    res.render("articles", {
      articles: [article],
      path: "/articles",
      error: null,
      req: req,
    });
  } catch (err) {
    res.render("articles", {
      articles: [],
      path: "/articles",
      error: "Unable to fetch article",
      req: req,
    });
  }
});

// Handle article creation with optional image upload
// This endpoint processes multipart form data and supports Cloudinary image uploads
app.post("/articles/add", handleUpload, (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
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

    async function upload(req) {
      try {
        let result = await streamUpload(req);
        return result;
      } catch (error) {
        throw new Error("Error uploading to Cloudinary");
      }
    }

    upload(req)
      .then((uploaded) => {
        processArticle(uploaded.url);
      })
      .catch((error) => {
        res.redirect(
          "/articles/add?error=" + encodeURIComponent(error.message)
        );
      });
  } else {
    processArticle("");
  }

  function processArticle(imageUrl) {
    req.body.featureImage = imageUrl;
    contentService
      .addArticle(req.body)
      .then(() => res.redirect("/articles"))
      .catch((err) => {
        res.redirect(
          "/articles/add?error=" +
            encodeURIComponent(err.message || "Error creating article")
        );
      });
  }
});

// 404 route
app.use((req, res) => {
  res.status(404).render("404", { path: null });
});

// Initialize the content service before starting the server
contentService
  .initialize()
  .then(() => {
    // Start the server after the data has been loaded
    app.listen(HTTP_PORT, () => {
      console.log(
        `Express http server is running on http://localhost:${HTTP_PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Error initializing content service:", err);
    process.exit(1);
  });
