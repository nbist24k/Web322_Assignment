/*
 * Student Name: Nirajan Bist
 * Student Number: 157716226
 * Email: nbist1@myseneca.ca
 * Date Created: 2024/10/04
 * Last Modified: 2024/12/04
 */

const { Sequelize } = require("sequelize");
const { sequelize, Article, Category } = require("./models");

// Initialize function to sync database with optimized retry logic
async function initialize() {
  let retries = 5;
  const timeout = 5000; // 5 seconds timeout between retries

  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("Database connection successful.");
      await sequelize.sync();
      console.log("Database synchronized successfully.");
      return;
    } catch (err) {
      console.error("Connection attempt failed:", err.message);
      retries--;

      if (retries === 0) {
        throw new Error("Unable to sync the database after multiple attempts");
      }

      console.log(
        `Retrying connection in ${
          timeout / 1000
        } seconds... (${retries} attempts left)`
      );
      await new Promise((res) => setTimeout(res, timeout));
    }
  }
}

// Get published articles
async function getPublishedArticles() {
  try {
    const articles = await Article.findAll({
      where: { published: true },
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
      order: [["publisheddate", "DESC"]], // Order by publish date, newest first
    });

    if (!articles || articles.length === 0) {
      throw new Error("No published articles available");
    }

    return articles.map((article) => ({
      ...article.get({ plain: true }),
      categoryName: article.category.name,
    }));
  } catch (err) {
    console.error("Error fetching published articles:", err);
    throw new Error("Error fetching published articles");
  }
}

// Get all articles
async function getAllArticles() {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
      order: [
        ["publisheddate", "DESC"], // Primary sort by publish date
        ["title", "ASC"], // Secondary sort by title
      ],
    });

    if (!articles || articles.length === 0) {
      throw new Error("No articles available");
    }

    return articles.map((article) => ({
      ...article.get({ plain: true }),
      categoryName: article.category.name,
    }));
  } catch (err) {
    console.error("Error fetching all articles:", err);
    throw new Error("Error fetching articles");
  }
}

// Get all categories
async function getCategories() {
  try {
    const categories = await Category.findAll({});

    if (!categories || categories.length === 0) {
      throw new Error("No categories available");
    }

    return categories;
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw new Error("Error fetching categories");
  }
}

// Add an article
async function addArticle(articleData) {
  if (!articleData) {
    throw new Error("No article data provided");
  }

  try {
    const article = await Article.create({
      title: articleData.title || "",
      content: articleData.content || "",
      categoryid: parseInt(articleData.categoryId),
      published: articleData.published === undefined ? false : true,
      publisheddate: new Date().toISOString().split("T")[0],
      featureimage: articleData.featureImage || "",
      source: articleData.source || "",
    });

    const articleWithCategory = await Article.findByPk(article.id, {
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });

    return {
      ...articleWithCategory.get({ plain: true }),
      categoryName: articleWithCategory.category.name,
    };
  } catch (err) {
    console.error("Error adding article:", err);
    throw new Error("Error adding article");
  }
}

// Update an article
async function updateArticle(id, articleData) {
  if (!articleData) {
    throw new Error("No article data provided");
  }

  try {
    await Article.update(
      {
        title: articleData.title,
        content: articleData.content,
        categoryid: parseInt(articleData.categoryId),
        published: articleData.published === undefined ? false : true,
        featureimage: articleData.featureImage,
        source: articleData.source,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    const article = await Article.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });

    if (!article) {
      throw new Error("Article not found");
    }

    return {
      ...article.get({ plain: true }),
      categoryName: article.category.name,
    };
  } catch (err) {
    console.error("Error updating article:", err);
    throw new Error("Error updating article");
  }
}

// Delete an article
async function deleteArticle(id) {
  try {
    const count = await Article.destroy({
      where: { id: parseInt(id) },
    });

    if (count === 0) {
      throw new Error("Article not found");
    }
  } catch (err) {
    console.error("Error deleting article:", err);
    throw new Error("Error deleting article");
  }
}

// Get articles by category
async function getArticlesByCategory(categoryId) {
  try {
    const articles = await Article.findAll({
      where: { categoryid: categoryId },
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
      order: [["publisheddate", "DESC"]], // Order by publish date within category
    });

    if (!articles || articles.length === 0) {
      throw new Error(`No articles found for category ID: ${categoryId}`);
    }

    return articles.map((article) => ({
      ...article.get({ plain: true }),
      categoryName: article.category.name,
    }));
  } catch (err) {
    console.error("Error fetching articles by category:", err);
    throw new Error("Error fetching articles by category");
  }
}

// Get articles by minimum date
async function getArticlesByMinDate(minDateStr) {
  try {
    const articles = await Article.findAll({
      where: {
        publisheddate: {
          [Sequelize.Op.gte]: minDateStr,
        },
      },
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
      order: [["publisheddate", "DESC"]], // Order by publish date
    });

    if (!articles || articles.length === 0) {
      throw new Error("No results returned");
    }

    return articles.map((article) => ({
      ...article.get({ plain: true }),
      categoryName: article.category.name,
    }));
  } catch (err) {
    console.error("Error fetching articles by date:", err);
    throw new Error("Error fetching articles by date");
  }
}

// Get article by ID
async function getArticleById(id) {
  try {
    const article = await Article.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });

    if (!article) {
      throw new Error("No result returned");
    }

    return {
      ...article.get({ plain: true }),
      categoryName: article.category.name,
    };
  } catch (err) {
    console.error("Error fetching article by ID:", err);
    throw new Error("Error fetching article by ID");
  }
}

module.exports = {
  initialize,
  getAllArticles,
  getPublishedArticles,
  getCategories,
  addArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory,
  getArticlesByMinDate,
  getArticleById,
};
