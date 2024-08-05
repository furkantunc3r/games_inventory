const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const categoriesIndex = asyncHandler(async (req, res, next) => {
    res.render('categoriesIndex', {
        title: 'All Categories',
        categoryList: await db.getAllCategories()
    });
});

module.exports = {
    categoriesIndex
};