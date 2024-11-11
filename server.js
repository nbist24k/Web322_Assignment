/*
 * Student Name: Nirajan Bist
 * Student Number: 157716226
 * Email: nbist1@myseneca.ca
 * Date Created: 2024/10/04
 * Last Modified: 2024/11/11
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

//Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

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
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

//About route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

//Updated /articles route with query parameters
app.get("/articles", (req, res) => {
  const { category, minDate } = req.query;

  if (category) {
    contentService
      .getArticlesByCategory(parseInt(category))
      .then((articles) => res.json(articles))
      .catch((err) => res.status(404).json({ message: err }));
  } else if (minDate) {
    contentService
      .getArticlesByMinDate(minDate)
      .then((articles) => res.json(articles))
      .catch((err) => res.status(404).json({ message: err }));
  } else {
    contentService
      .getAllArticles()
      .then((articles) => res.json(articles))
      .catch((err) => res.status(500).json({ message: err }));
  }
});

//Categories route
app.get("/categories", (req, res) => {
  contentService
    .getCategories()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json({ message: err }));
});

//Add post route
app.get("/articles/add", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/addArticle.html"));
});

// New route to get article by ID
app.get("/article/:id", (req, res) => {
  contentService
    .getArticleById(parseInt(req.params.id))
    .then((article) => res.json(article))
    .catch((err) => res.status(404).json({ message: err }));
});

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
          "/articles/add?error=" + encodeURIComponent("Error creating article")
        );
      });
  }
});

// 404 route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
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
  });
