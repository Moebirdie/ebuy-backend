const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {

  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!oneTagData) {
      res.status(404).json({ message: `No tag found with id ${req.params.id}.`});
      return;
    }

    res.status(200).json(oneTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  try {
    const newTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const getTagToUpdate = await Tag.findByPk(req.params.id);
    if (!getTagToUpdate) {
      res.status(404).json({ message: `There is no tag with id ${req.params.id}.`});
      return;
    } else {
      const updateTagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        }
      }
      );
      res.status(200).json(`${getTagToUpdate.tag_name} updated successfully to ${req.body.tag_name}`);
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const getTagToDelete = await Tag.findByPk(req.params.id);
    if (!getTagToDelete) {
      res.status(404).json({ message: `There is no tag with id ${req.params.id}` });
      return;
    }
    else {
      const deleteTagData = await Tag.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json(`${getTagToDelete.tag_name} deleted successfully!`);
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
