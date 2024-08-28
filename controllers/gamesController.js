const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const singleGame = asyncHandler(async (req, res, next) => {
    const game = await db.getSingleGame(req.params.id);

    if (((game || {}).game || []).length === 0) {
        return next();
    }

    res.render('singleGame', {
        title: 'G.A.P',
        game: ((game || {}).game || [])[0] || {}
    });
});

module.exports = {
    singleGame
};