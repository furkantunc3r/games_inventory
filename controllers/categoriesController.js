const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

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

module.exports = {
    categoriesIndex,
    singleCategory
};