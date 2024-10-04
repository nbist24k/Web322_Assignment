// require the fs module
const fs = require("fs");

// require the path module
const path = require("path");

//Global arrays to store the data
let articles = [];
let categories = [];

//Initialize the data by reading JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "data/articles.json"),
      "utf8",
      (err, data) => {
        if (err) {
          reject("Unable to read articles file");
          return;
        }
        articles = JSON.parse(data);

        fs.readFile(
          path.join(__dirname, "data/categories.json"),
          "utf8",
          (err, data) => {
            if (err) {
              reject("Unable to read categories file");
              return;
            }
            categories = JSON.parse(data);
            resolve();
          }
        );
      }
    );
  });
}

//Get published articles (only those with `published` set to true)
function getPublishedArticles() {
  return new Promise((resolve, reject) => {
    const publishedArticles = articles.filter(
      (article) => article.published === true
    );
    if (publishedArticles.length > 0) {
      resolve(publishedArticles);
    } else {
      reject("No published articles available");
    }
  });
}

//Get all articles
function getAllArticles() {
  return new Promise((resolve, reject) => {
    if (articles.length > 0) {
      resolve(articles);
    } else {
      reject("No articles available");
    }
  });
}

//Get all categories
function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) {
      resolve(categories);
    } else {
      reject("No categories available");
    }
    resolve();
  });
}

//Export the functions
module.exports = {
  initialize,
  getPublishedArticles,
  getAllArticles,
  getCategories,
};
