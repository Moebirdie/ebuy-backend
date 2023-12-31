const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productsData = await Product.findAll({
      include: [{ model: Category }],
    });
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const oneProductData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    if (!oneProductData) {
      res.status(404).json({ message: `No product found with id ${req.params.id}.` });
      return;
    }

    res.status(200).json(oneProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  const newProductData = await Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
    res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const getProductToUpdate = await Product.findByPk(req.params.id)
    if (!getProductToUpdate) {
      res.status(404).json(`There is no product id ${res.params.id}.`)
      return;
    } else {
      await Product.update(req.body, {
        where: {
          id: req.params.id,
        }
      })
        .then((product) => {
          if (req.body.tagIds && req.body.tagIds.length) {
            const prodTags = ProductTag.findAll({
              where: { product_id: req.params.id }
            }).then(async (productTags) => {
              // create filtered list of new tag_ids
              const productTagIds = productTags.map(({ tag_id }) => tag_id);
              const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                  return {
                    product_id: req.params.id,
                    tag_id,
                  };
                });

              // figure out which ones to remove
              const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);
              // run both actions
              await Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
              ]);
            })
          }
          return res.status(200).json(`${getProductToUpdate.product_name} successfully updated to ${req.body.product_name}!`)
        })
    }
  }
  catch (err) {
    // console.log(err);
    res.status(400).json(err);
    return;
  }
});


// Delete a product

router.delete('/:id', async(req, res) => {
  try {
    const getProductToDelete = await Product.findByPk(req.params.id);
    if (!getProductToDelete) {
      res.status(404).json({ message: `There is no product with id ${req.params.id}.`});
      return;
    }
    else {
      const deleteProductData = await Product.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json(`${getProductToDelete.product_name} deleted successfully!`);
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;