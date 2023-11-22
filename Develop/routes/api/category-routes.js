// Router file for category-related API routes.

const router = require('express').Router();

const { Category, Product } = require('../../models');

// -------------------------------------------------------------
// Finding all categories.

router.get('/', async (req, res) => {
  try{
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

// -------------------------------------------------------------
// Finding single category by ID.

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = await Category.findByPk(id, {
      include: [{ model: Product }]
    });
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------
// Creating new category.

router.post('/', async (req, res) => {
  try {
    console.info(req.body);
    const categoryCreated = await Category.create(req.body);
    res.status(200).json(categoryCreated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------
// Updating category.

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).send(`Category [ID:${id}] successfully updated.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------
// Deleting category by ID.

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDelete = await Category.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send(`Category [ID:${id}] successfully removed from database.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
