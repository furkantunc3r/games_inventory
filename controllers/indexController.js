const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const index = asyncHandler(async (req, res, next) => {
    res.render('index', {
        title: 'G.A.P',
        gamesList: await db.getAllGames()
    });
});

module.exports = {
    index
};