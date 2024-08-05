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

module.exports = {
    getAllGames,
    getAllCategories
};