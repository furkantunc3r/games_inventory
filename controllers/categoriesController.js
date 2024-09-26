const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const {
    body,
    validationResult
} = require("express-validator");

const categoriesIndex = asyncHandler(async (req, res, next) => {
    res.render('categoriesIndex', {
        title: 'G.A.P',
        categoryList: await db.getAllCategories()
    });
});

const singleCategory = asyncHandler(async (req, res, next) => {
    const data = await db.getSingleCategory(req.params.id);

    res.render('singleCategory', {
        title: 'G.A.P',
        gamesInCategory: data.gamesInCategory || []
    });
});

const createCategoryGet = (req, res, next) => {
    return res.status(200).render('createCategory', {
        title: 'G.A.P',
        errors: []
    });
};

const createCategoryPost = [
    body('categoryName')
    .trim()
    .notEmpty()
    .withMessage('Category Name can not be empty'),
    body('categoryDescription')
    .trim()
    .notEmpty()
    .withMessage('Category description can not be empty')
    .isLength({
        min: 10
    }).withMessage('Description should be at least 10 characters'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('createCategory', {
                title: 'G.A.P',
                errors: errors.array(),
            });
        }

        await db.createNewCategory(req.body.categoryName, req.body.categoryDescription);

        res.redirect('/category')
    }),
];

const updateCategoryGet = asyncHandler(async (req, res, next) => {
    const category = await db.getSingleCategory(req.params.id);

    return res.render('updateCategoryForm', {
        title: 'G.A.P',
        errors: [],
        category: category.category[0]
    });
});

const updateCategoryPost = [
    body('categoryName')
    .trim()
    .notEmpty()
    .withMessage('Category name can not be empty'),
    body('categoryDescription')
    .trim()
    .notEmpty()
    .withMessage('Category description can not be empty')
    .isLength({
        min: 10
    }).withMessage('Description should be at least 10 characters'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const category = await db.getSingleCategory(req.params.id);

        if (!errors.isEmpty()) {
            return res.status(400).render('updateCategoryForm', {
                title: 'G.A.P',
                category: category.category[0],
                errors: errors.array(),
            });
        }

        await db.updateCategory(req.body.categoryName, req.body.categoryDescription, req.params.id);

        res.redirect('/category');
    }),
];

module.exports = {
    categoriesIndex,
    singleCategory,
    createCategoryGet,
    createCategoryPost,
    updateCategoryGet,
    updateCategoryPost
};