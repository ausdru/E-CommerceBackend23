// Router file for tag-related API routes.

const router = require('express').Router();

const { Tag, Product, ProductTag } = require('../../models');

// -------------------------------------------------------------
// Finding all tags.

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// -------------------------------------------------------------
// Finding single tag by ID.

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const tagId = await Tag.findByPk(id, {
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err)
  }
});

// -------------------------------------------------------------
// Creating new tag.

router.post('/', async (req, res) => {
  try {
    console.info(req.body);
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------
// Updating tag's name.

router.put('/:id', async (req, res) => {
  try {
    console.info(req.body);
    const { id } = req.params;
    const { tag_name } = req.body;
    const updateTagName = await Tag.update(req.body, {
      where: {
        id: id,
      }
    })
    res.status(200).send(`Tag [ID:${id}] successfully updated to ${tag_name}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------
// Deleting tag by ID.

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProductTag = await ProductTag.destroy({
      where: {
        tag_id: id,
      }
    })
      .then(async () => {
        const deleteTag = await Tag.destroy({
          where: {
            id: id,
          }
        })
      })
    res.status(200).send(`Tag [ID:${id}] successfully deleted.`)
  } catch (err) {
    res.status(500).json(err);
  }
}
);

module.exports = router;
