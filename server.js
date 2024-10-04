//require the express module
const express = require("express");

//require the path module
const path = require("path");

//get the app object from express
const app = express();

//

//get the port from the environment variable
const HTTP_PORT = process.env.PORT || 4250;

//add a route for the public/css folder
app.use(express.static(__dirname + "/public"));

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
  res.sendFile(path.join(__dirname, "/views/articles.html"));
});

//Categories route
app.get("/categories", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/categories.html"));
});

//run the web server
app.listen(HTTP_PORT, () => {
  console.log("Express http server listening on http://localhost:" + HTTP_PORT);
});
