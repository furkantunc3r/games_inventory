const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const categoriesIndex = asyncHandler(async (req, res, next) => {
    res.render('categoriesIndex', {
        title: 'All Categories',
        categoryList: await db.getAllCategories()
    });
});

const singleCategory = asyncHandler(async (req, res, next) => {
    const data = await db.getSingleCategory(req.params.id);

    res.render('singleCategory', {
        title: (data.category[0] || {}).name || '',
        gamesInCategory: data.gamesInCategory || []
    });
});

module.exports = {
    categoriesIndex,
    singleCategory
};