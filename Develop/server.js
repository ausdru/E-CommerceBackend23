// This file sets up the Express server, defines routes, 
// and syncs with the Sequelize database.

const express = require('express');

const routes = require('./routes');

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

// -------------------------------------------------------------
// Middleware to parse incoming JSON and urlencoded data.

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

// -------------------------------------------------------------
// Syncs the Sequelize models with the database and starts the server.

sequelize.sync({force: false})
.then(() => {
  app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  });
});