// Main router file that handles all routes.

const router = require('express').Router();

const apiRoutes = require('./api');

// -------------------------------------------------------------
// All API routes are prefixed with '/api'.

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;