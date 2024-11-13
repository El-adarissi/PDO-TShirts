const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_URI);
const Order=require('./Order')
const Product=require('./Product')
const OrderProducts = sequelize.define('OrderProducts', {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'orderId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    size: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    color: {
      type: DataTypes.JSON, 
      defaultValue: JSON.stringify({})
      
    },
  }, {
    timestamps: false,
  });
  

module.exports = OrderProducts;
