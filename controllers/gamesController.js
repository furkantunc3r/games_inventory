const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const {
    body,
    validationResult
} = require('express-validator');

const singleGame = asyncHandler(async (req, res, next) => {
    const gameInformation = await db.getSingleGame(req.params.id);

    res.render('singleGame', {
        title: 'G.A.P',
        gameInformation: gameInformation
    });
});

const createSingleGameGet = (req, res, next) => {
    return res.status(200).render('createGame', {
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

        res.redirect('/');
    }),
];

const updateGameGet = asyncHandler(async (req, res, next) => {
    const game = await db.getSingleGame(req.params.id);
    const allCategories = await db.getAllCategories();

    if (((game || {}).game || []).length === 0) {
        return next();
    }

    res.render('updateGameForm', {
        title: 'G.A.P',
        game: ((game || {}).game || [])[0] || {},
        categories: allCategories,
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
        const allCategories = await db.getAllCategories();

        if (!errors.isEmpty()) {
            return res.status(400).render('updateGameForm', {
                title: 'G.A.P',
                game: ((game || {}).game || [])[0] || {},
                categories: allCategories,
                errors: errors.array(),
            });
        }

        await db.updateGame(req.body.gameName, req.body.gameDescription, req.body.selectedCategories, req.params.id);

        setTimeout(() => {
            res.redirect(`/games/${req.params.id}`);
        }, 250);
    }),
];

const deleteSingleGamePost = asyncHandler(async (req, res, next) => {
    await db.deleteSingleGame(req.params.id);

    setTimeout(() => {
        res.redirect('/');
    }, 250);
});

module.exports = {
    singleGame,
    createSingleGameGet,
    createSingleGamePost,
    updateGameGet,
    updateGamePost,
    deleteSingleGamePost
};