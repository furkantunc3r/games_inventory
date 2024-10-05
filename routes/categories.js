const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.post('/update/:id', categoriesController.updateCategoryPost);
router.get('/update/:id', categoriesController.updateCategoryGet);
router.get('/', categoriesController.categoriesIndex);
router.get('/create', categoriesController.createCategoryGet);
router.post('/create', categoriesController.createCategoryPost);
router.get('/:id', categoriesController.singleCategory);
router.post('/delete/:id', categoriesController.deleteSingleCategoryPost);

module.exports = router;