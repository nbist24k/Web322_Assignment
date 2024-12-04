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
      keepAlive: true,
      connectTimeout: 60000,
    },
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      max: 5,
      timeout: 3000,
    },
    logging: false,
    native: false,
    define: {
      underscored: true,
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
