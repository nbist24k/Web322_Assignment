/*
 * Student Name: Nirajan Bist
 * Student Number: 157716226
 * Email: nbist1@myseneca.ca
 * Date Created: 2024/10/04
 * Last Modified: 2024/10/04
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

// modules for the add post form
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

//Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
const upload = multer();

//Cloudinary config
cloudinary.config();

//Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

//About route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

//Articles route
app.get("/articles", (req, res) => {
  contentService
    .getPublishedArticles()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(500).json({ message: err }));
});

//Categories route
app.get("/categories", (req, res) => {
  contentService
    .getCategories()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json({ message: err }));
});

//Add post route
app.get("/add-post", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/add-post.html"));
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
