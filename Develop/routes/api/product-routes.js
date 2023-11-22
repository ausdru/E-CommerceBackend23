// Router file for product-related API routes.

const router = require('express').Router();

const { Product, Category, Tag, ProductTag } = require('../../models');

// -------------------------------------------------------------
// Finding all products.

router.get('/', async (req, res) => {
  console.info(req.body);
  try {
    const productData = await Product.findAll({
      include: [
      {
        model: Category,
      },
      {
        model: Tag,
        through: ProductTag,
      },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------
// Finding single product by ID.

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await Product.findByPk(id, {
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          through: ProductTag,
        }
      ]
    });
    res.status(200).json(productId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------
// Creating new product.

router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// -------------------------------------------------------------
// Updating product.

router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// -------------------------------------------------------------
// Deleting product by ID.

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productTagDelete = await ProductTag.destroy({
      where: {
        product_id: id,
      }
    })
    .then(async () => {
      const productDelete = await Product.destroy({
      where: {
        id: id,
      }
      })
    });
    res.status(200).json(`Product successfully deleted.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
