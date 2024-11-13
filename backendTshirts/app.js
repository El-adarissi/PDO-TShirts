const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser=require('body-parser')
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');
const sequelize =require('./config/database')
app.use(cors());
app.options('*', cors())
app.use('/public/uploads', express.static('public/uploads'));
const api = process.env.API_URL;

const User=require('./models/User')
const Order=require('./models/Order')
const Product=require('./models/Product')
const OrderProducts=require('./models/OrderProducts')

// Define the relationship

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Product, { through: OrderProducts, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProducts, foreignKey: 'productId' });


//routers
const productsRoutes = require('./routers/products');
const ordersRoutes = require('./routers/Orders');

// midelwares
app.use(bodyParser.json());
app.use(express.json()); 
app.use(morgan('tiny'));
app.use(`${api}/`, productsRoutes);
app.use(`${api}/`, ordersRoutes);


// Test the connection and sync models
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await User.sync({ alter: true });
    console.log("User table created.");

    await Product.sync({ alter: true });
    console.log("Product table created.");

    await Order.sync({ alter: true });
    console.log("Order table created.");

    await OrderProducts.sync({ alter: true });
    console.log("Order table created.");
      await sequelize.sync({ alter: true }); 
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

//Server
app.listen(3000, ()=>{
    console.log(api)
    console.log('server is running http://localhost:3000');
})
