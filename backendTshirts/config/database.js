const { Sequelize } = require('sequelize');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DATA_BASE_NAME,          
  process.env.DATA_BASE_USERNAME,      
  process.env.DATA_BASE_PASSWORD,     
  {
    host: process.env.DATA_BASE_HOST || 'localhost', 
    port: process.env.DATA_BASE_PORT || 3306,         
    dialect: 'mysql',                                 
    logging: console.log                            
  }
);

// Test the connection to the database
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();


// Export the Sequelize instance to be used in models
module.exports = sequelize;
