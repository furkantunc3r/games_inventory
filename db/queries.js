const pool = require('./pool');

async function getAllGames() {
    let allGames = [];

    try {
        allGames = (await pool.query('SELECT * FROM games')).rows;
    } catch (error) {
        console.log(error);

        return;
    }

    return allGames;
};

async function getAllCategories() {
    let allCategories = [];

    try {
        allCategories = (await pool.query('SELECT * FROM categories')).rows;
    } catch (error) {
        console.log(error);

        return;
    }

    return allCategories;
}

async function getSingleCategory(id) {
    let category = [];
    let gamesInCategory = [];

    try {
        category = (await pool.query("SELECT * FROM categories WHERE category_id = $1", [id])).rows;
        gamesInCategory = (await pool.query("SELECT name FROM gamesAndCategories INNER JOIN games ON gamesAndCategories.game_id = games.game_id WHERE gamesAndCategories.category_id = $1", [id])).rows;

        return {
            category: category,
            gamesInCategory: gamesInCategory
        }
    } catch (error) {
        console.log(error);

        return;
    }
}
module.exports = {
    getAllGames,
    getAllCategories,
    getSingleCategory
};