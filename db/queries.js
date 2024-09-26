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

async function getSingleGame(id) {
    let game = [];

    try {
        game = (await pool.query("SELECT * FROM games WHERE game_id = $1", [id])).rows;

        return {
            game: game,
        }
    } catch (error) {
        console.log(error);

        return;
    }
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
        gamesInCategory = (await pool.query("SELECT * FROM gamesAndCategories INNER JOIN games ON gamesAndCategories.game_id = games.game_id WHERE gamesAndCategories.category_id = $1", [id])).rows;

        return {
            category: category,
            gamesInCategory: gamesInCategory
        }
    } catch (error) {
        console.log(error);

        return;
    }
}

async function createNewCategory(categoryName, categoryDesription) {
    try {
        await pool.query("INSERT INTO CATEGORIES (name, description) values($1, $2)", [categoryName, categoryDesription]);

        return 'Insert Successfull';
    } catch (error) {
        console.log(error);

        return;
    }
}

async function createNewGame(gameName, gameDesription) {
    try {
        await pool.query("INSERT INTO GAMES (name, description) values($1, $2)", [gameName, gameDesription]);

        return 'Insert Successful';
    } catch (error) {
        console.log(error);

        return;
    }
}

async function updateGame(gameName, gameDescription, gameId) {
    try {
        await pool.query("UPDATE GAMES SET name = $1, description = $2 WHERE game_id = $3", [gameName, gameDescription, gameId]);

        return 'Update Successful';
    } catch (error) {
        console.log(error);

        return;
    }
}

async function updateCategory(categoryName, categoryDescription, categoryId) {
    try {
        await pool.query("UPDATE CATEGORIES SET name = $1, description = $2 WHERE category_id = $3", [categoryName, categoryDescription, categoryId]);

        return 'Update Successful';
    } catch (error) {
        console.log(error);

        return;
    }
}

module.exports = {
    getAllGames,
    getSingleGame,
    getAllCategories,
    getSingleCategory,
    createNewCategory,
    createNewGame,
    updateGame,
    updateCategory
};