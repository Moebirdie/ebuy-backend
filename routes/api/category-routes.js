const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//find one category and its associated products
router.get('/:id', async (req, res) => {

  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!oneCategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(oneCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const getCategoryToUpdate = await Category.findByPk(req.params.id);
    if (!getCategoryToUpdate) {
      res.status(404).json({ message: 'There is no category with this id!' });
      return;
    } else {
      const updateCategoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        }
      }
      );
      res.status(200).json(`${getCategoryToUpdate.category_name} updated successfully!`);
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const getCategoryToDelete = await Category.findByPk(req.params.id);
    if (!getCategoryToDelete) {
      res.status(404).json({ message: 'There is no category with this id!' });
      return;
    }
    else {
      const deleteCategoryData = await Category.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json(`${getCategoryToDelete.category_name} deleted successfully!`);
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
