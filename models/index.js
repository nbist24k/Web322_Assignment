const { Sequelize } = require("sequelize");

let sequelize;

// Create Sequelize instance with connection pooling and timeout settings
const initializeSequelize = () => {
  if (!sequelize) {
    sequelize = new Sequelize(
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
        pool: {
          max: 2,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
  }
  return sequelize;
};

// Initialize sequelize
sequelize = initializeSequelize();

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
