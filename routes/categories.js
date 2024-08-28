const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.categoriesIndex);
router.get('/:id', categoriesController.singleCategory);

module.exports = router;