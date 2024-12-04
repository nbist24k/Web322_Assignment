/*
 * Student Name: Nirajan Bist
 * Student Number: 157716226
 * Email: nbist1@myseneca.ca
 * Date Created: 2024/10/04
 * Last Modified: 2024/12/04
 */

const { Sequelize } = require("sequelize");
const { sequelize, Article, Category } = require("./models");

// Initialize function to sync database with connection retry logic
function initialize() {
  return new Promise(async (resolve, reject) => {
    let retries = 5;
    while (retries) {
      try {
        await sequelize.authenticate();
        console.log("Database connection successful.");
        await sequelize.sync();
        console.log("Database synchronized successfully.");
        resolve();
        break;
      } catch (err) {
        retries -= 1;
        if (retries === 0) {
          console.error("Database initialization error:", err);
          reject("Unable to sync the database: " + err.message);
          break;
        }
        console.log(
          `Connection attempt failed. Retrying... (${retries} attempts left)`
        );
        await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds before retrying
      }
    }
  });
}

// Get published articles
function getPublishedArticles() {
  return new Promise((resolve, reject) => {
    Article.findAll({
      where: { published: true },
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    })
      .then((articles) => {
        if (!articles || articles.length === 0) {
          reject("No published articles available");
          return;
        }
        const formattedArticles = articles.map((article) => ({
          ...article.get({ plain: true }),
          categoryName: article.category.name,
        }));
        resolve(formattedArticles);
      })
      .catch((err) => {
        console.error("Error fetching published articles:", err);
        reject("Error fetching published articles");
      });
  });
}

// Get all articles
function getAllArticles() {
  return new Promise((resolve, reject) => {
    Article.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    })
      .then((articles) => {
        if (!articles || articles.length === 0) {
          reject("No articles available");
          return;
        }
        const formattedArticles = articles.map((article) => ({
          ...article.get({ plain: true }),
          categoryName: article.category.name,
        }));
        resolve(formattedArticles);
      })
      .catch((err) => {
        console.error("Error fetching all articles:", err);
        reject("Error fetching articles");
      });
  });
}

// Get all categories
function getCategories() {
  return new Promise((resolve, reject) => {
    Category.findAll()
      .then((categories) => {
        if (!categories || categories.length === 0) {
          reject("No categories available");
          return;
        }
        resolve(categories);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        reject("Error fetching categories");
      });
  });
}

// Add an article
function addArticle(articleData) {
  return new Promise((resolve, reject) => {
    if (!articleData) {
      reject("No article data provided");
      return;
    }

    Article.create({
      title: articleData.title || "",
      content: articleData.content || "",
      categoryId: parseInt(articleData.categoryId),
      published: articleData.published === undefined ? false : true,
      publishedDate: new Date().toISOString().split("T")[0],
      featureImage: articleData.featureImage || "",
      source: articleData.source || "",
    })
      .then((article) => {
        return Article.findByPk(article.id, {
          include: [
            {
              model: Category,
              as: "category",
            },
          ],
        });
      })
      .then((article) => {
        const formattedArticle = {
          ...article.get({ plain: true }),
          categoryName: article.category.name,
        };
        resolve(formattedArticle);
      })
      .catch((err) => {
        console.error("Error adding article:", err);
        reject("Error adding article");
      });
  });
}

// Get articles by category
function getArticlesByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    Article.findAll({
      where: { categoryId: categoryId },
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    })
      .then((articles) => {
        if (!articles || articles.length === 0) {
          reject(`No articles found for category ID: ${categoryId}`);
          return;
        }
        const formattedArticles = articles.map((article) => ({
          ...article.get({ plain: true }),
          categoryName: article.category.name,
        }));
        resolve(formattedArticles);
      })
      .catch((err) => {
        console.error("Error fetching articles by category:", err);
        reject("Error fetching articles by category");
      });
  });
}

// Get articles by minimum date
function getArticlesByMinDate(minDateStr) {
  return new Promise((resolve, reject) => {
    Article.findAll({
      where: {
        publishedDate: {
          [Sequelize.Op.gte]: minDateStr,
        },
      },
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    })
      .then((articles) => {
        if (!articles || articles.length === 0) {
          reject("No results returned");
          return;
        }
        const formattedArticles = articles.map((article) => ({
          ...article.get({ plain: true }),
          categoryName: article.category.name,
        }));
        resolve(formattedArticles);
      })
      .catch((err) => {
        console.error("Error fetching articles by date:", err);
        reject("Error fetching articles by date");
      });
  });
}

// Get article by ID
function getArticleById(id) {
  return new Promise((resolve, reject) => {
    Article.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    })
      .then((article) => {
        if (!article) {
          reject("No result returned");
          return;
        }
        const formattedArticle = {
          ...article.get({ plain: true }),
          categoryName: article.category.name,
        };
        resolve(formattedArticle);
      })
      .catch((err) => {
        console.error("Error fetching article by ID:", err);
        reject("Error fetching article by ID");
      });
  });
}

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
