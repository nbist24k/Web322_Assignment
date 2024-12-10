const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance with optimized settings for serverless
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectModule: require("pg"),
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Import models
const Article = require("./article")(sequelize);
const Category = require("./category")(sequelize);

// Define associations
Category.hasMany(Article, {
  foreignKey: "categoryid",
  as: "articles",
});

Article.belongsTo(Category, {
  foreignKey: "categoryid",
  as: "category",
});

module.exports = {
  sequelize,
  Category,
  Article,
};
