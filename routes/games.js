const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

router.get('/:id', gamesController.singleGame);

module.exports = router;