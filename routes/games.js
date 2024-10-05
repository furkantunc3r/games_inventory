const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

router.get('/update/:id', gamesController.updateGameGet);
router.post('/update/:id', gamesController.updateGamePost);
router.get('/create', gamesController.createSingleGameGet);
router.post('/create', gamesController.createSingleGamePost);
router.post('/delete/:id', gamesController.deleteSingleGamePost);
router.get('/:id', gamesController.singleGame);

module.exports = router;