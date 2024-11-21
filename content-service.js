/*
 * Student Name: Nirajan Bist
 * Student Number: 157716226
 * Email: nbist1@myseneca.ca
 * Date Created: 2024/10/04
 * Last Modified: 2024/11/21
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

function getCategoryNameById(categoryId) {
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Unknown Category";
}

function addCategoryDetailsToArticle(article) {
  return {
    ...article,
    categoryName: getCategoryNameById(article.categoryId),
  };
}

//Get published articles (only those with `published` set to true)
function getPublishedArticles() {
  return new Promise((resolve, reject) => {
    const publishedArticles = articles
      .filter((article) => article.published === true)
      .map(addCategoryDetailsToArticle);
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
      const articlesWithCategories = articles.map(addCategoryDetailsToArticle);
      resolve(articlesWithCategories);
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
  });
}

// Add an article
function addArticle(articleData) {
  return new Promise((resolve, reject) => {
    if (!articleData) {
      reject("No article data provided");
      return;
    }
    const newArticle = {
      id: articles.length + 1,
      title: articleData.title || "",
      content: articleData.content || "",
      categoryId: parseInt(articleData.categoryId),
      published: articleData.published === undefined ? false : true,
      publishedDate: new Date().toISOString().split("T")[0],
      featureImage: articleData.featureImage || "",
      source: articleData.source || "",
    };

    articles.push(newArticle);
    resolve(addCategoryDetailsToArticle(newArticle));
  });
}

// Get articles by category
function getArticlesByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    const filteredArticles = articles
      .filter((article) => article.categoryId === categoryId)
      .map(addCategoryDetailsToArticle);
    if (filteredArticles.length > 0) {
      resolve(filteredArticles);
    } else {
      reject(
        `No articles found for category: ${getCategoryNameById(categoryId)}`
      );
    }
  });
}

// Get articles by minimum date
function getArticlesByMinDate(minDateStr) {
  return new Promise((resolve, reject) => {
    const filteredArticles = articles
      .filter(
        (article) => new Date(article.publishedDate) >= new Date(minDateStr)
      )
      .map(addCategoryDetailsToArticle);
    if (filteredArticles.length > 0) {
      resolve(filteredArticles);
    } else {
      reject("No results returned");
    }
  });
}

// Get article by ID
function getArticleById(id) {
  return new Promise((resolve, reject) => {
    const article = articles.find((article) => article.id === id);
    if (article) {
      resolve(addCategoryDetailsToArticle(article));
    } else {
      reject("No result returned");
    }
  });
}

// Export all functions
module.exports = {
  initialize,
  getAllArticles,
  getPublishedArticles,
  getCategories,
  addArticle,
  getArticlesByCategory,
  getArticlesByMinDate,
  getArticleById,
};
