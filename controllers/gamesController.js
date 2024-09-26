const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const {
    body,
    validationResult
} = require('express-validator');

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

const createSingleGameGet = (req, res, next) => {
    res.render('createGame', {
        title: 'G.A.P',
        errors: []
    });
};

const createSingleGamePost = [
    body('gameName')
    .trim()
    .notEmpty()
    .withMessage('Game name can not be empty'),
    body('gameDescription')
    .trim()
    .notEmpty()
    .withMessage('Game description can not be empty')
    .isLength({
        min: 10
    }).withMessage('Description should be at least 10 characters'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('createGame', {
                title: 'G.A.P',
                errors: errors.array(),
            });
        }

        await db.createNewGame(req.body.gameName, req.body.gameDescription);

        res.redirect('/games')
    }),
];

const updateGameGet = asyncHandler(async (req, res, next) => {
    const game = await db.getSingleGame(req.params.id);

    if (((game || {}).game || []).length === 0) {
        return next();
    }

    res.render('updateGameForm', {
        title: 'G.A.P',
        game: ((game || {}).game || [])[0] || {},
        errors: []
    });
});

const updateGamePost = [
    body('gameName')
    .trim()
    .notEmpty()
    .withMessage('Game name can not be empty'),
    body('gameDescription')
    .trim()
    .notEmpty()
    .withMessage('Game description can not be empty')
    .isLength({
        min: 10
    }).withMessage('Description should be at least 10 characters'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const game = await db.getSingleGame(req.params.id);

        if (!errors.isEmpty()) {
            return res.status(400).render('updateGameForm', {
                title: 'G.A.P',
                game: ((game || {}).game || [])[0] || {},
                errors: errors.array(),
            });
        }

        await db.updateGame(req.body.gameName, req.body.gameDescription, req.params.id);

        res.redirect('/');
    }),
];

module.exports = {
    singleGame,
    createSingleGameGet,
    createSingleGamePost,
    updateGameGet,
    updateGamePost
};