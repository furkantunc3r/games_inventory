const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const adminController = require('../controllers/passwordCheckController');

router.post('/update/:id', adminController, categoriesController.updateCategoryPost);
router.get('/update/:id', categoriesController.updateCategoryGet);
router.get('/', categoriesController.categoriesIndex);
router.get('/create', categoriesController.createCategoryGet);
router.post('/create', adminController, categoriesController.createCategoryPost);
router.get('/:id', categoriesController.singleCategory);
router.post('/delete/:id', adminController, categoriesController.deleteSingleCategoryPost);

module.exports = router;