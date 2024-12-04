const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Article = sequelize.define(
    "Article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      categoryid: {
        // Changed from categoryId to match PostgreSQL column name
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "categoryid", // Explicitly specify the column name
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publisheddate: {
        // Changed from publishedDate to match PostgreSQL column name
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        field: "publisheddate", // Explicitly specify the column name
      },
      featureimage: {
        // Changed from featureImage to match PostgreSQL column name
        type: DataTypes.STRING,
        allowNull: true,
        field: "featureimage", // Explicitly specify the column name
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "articles",
      underscored: true, // Use underscored naming convention
    }
  );

  return Article;
};
