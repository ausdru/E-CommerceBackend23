// Main router file for API routes.

const router = require('express').Router();

const categoryRoutes = require('./category-routes');

const productRoutes = require('./product-routes');

const tagRoutes = require('./tag-routes');

// -------------------------------------------------------------
// Each route is prefixed with its respective entity name.

router.use('/categories', categoryRoutes);

router.use('/products', productRoutes);

router.use('/tags', tagRoutes);

module.exports = router;
