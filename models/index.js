const { Sequelize } = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize(
  "Web322_AS5",
  "Web322_AS5_owner",
  "CQRuIp19Jcem",
  {
    host: "ep-red-shadow-a5kpb4y0.us-east-2.aws.neon.tech",
    dialect: "postgres",
    port: 5432,
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
  foreignKey: "categoryId",
  as: "articles",
});

Article.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = {
  sequelize,
  Category,
  Article,
};
