// This establishes a connection to the database using Sequelize.

const Sequelize = require('sequelize');

require('dotenv').config();

// -------------------------------------------------------------
// If the application is deployed to JawsDB, it uses the JAWSDB_URL. Otherwise, it uses local database credentials.

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
