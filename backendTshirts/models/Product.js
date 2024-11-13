const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_URI);

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    richDescription: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    oldprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    Category: {
      type: DataTypes.STRING(255),
      defaultValue: "ALL",
    },
    colorOptions: {
      type: DataTypes.JSON, 
      defaultValue: JSON.stringify({})
    },
    sizeOptions: {
      type: DataTypes.JSON, 
      defaultValue: JSON.stringify({})
    },
  },
  {
    tableName: "Products",
    timestamps: false,
    toJSON: {
      virtuals: true,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Product;
