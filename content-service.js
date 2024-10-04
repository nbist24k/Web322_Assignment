/*
 * Student Name: Nirajan Bist
 * Student Number: 157716226
 * Email: nbist1@myseneca.ca
 * Date Created: 2024/10/04
 * Last Modified: 2024/10/04
 */

// require the fs module
const fs = require("fs");

// require the path module
const path = require("path");

//Global arrays to store the data
let articles = [];
let categories = [];

//path to the data folder
const dataDir = path.join(__dirname, "data");

// Initialize function to load data from articles.json and categories.json
function initialize() {
  return new Promise((resolve, reject) => {
    // Read articles.json from the data folder
    fs.readFile(path.join(dataDir, "articles.json"), "utf8", (err, data) => {
      if (err) {
        reject("Unable to read articles file");
        return;
      }
      try {
        articles = JSON.parse(data); // Store parsed articles in the global array
      } catch (parseError) {
        reject("Error parsing articles file");
        return;
      }

      // Now read categories.json from the data folder
      fs.readFile(
        path.join(dataDir, "categories.json"),
        "utf8",
        (err, data) => {
          if (err) {
            reject("Unable to read categories file");
            return;
          }
          try {
            categories = JSON.parse(data); // Store parsed categories in the global array
            resolve(); // Both files have been read successfully
          } catch (parseError) {
            reject("Error parsing categories file");
          }
        }
      );
    });
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
