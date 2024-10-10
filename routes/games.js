const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const adminController = require('../controllers/passwordCheckController');

router.get('/update/:id', gamesController.updateGameGet);
router.post('/update/:id', adminController, gamesController.updateGamePost);
router.get('/create', gamesController.createSingleGameGet);
router.post('/create', adminController, gamesController.createSingleGamePost);
router.post('/delete/:id', adminController, gamesController.deleteSingleGamePost);
router.get('/:id', gamesController.singleGame);

module.exports = router;