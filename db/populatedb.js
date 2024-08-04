const {
    Client
} = require('pg');
const {
    argv
} = require('node:process');

const SQL = `
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS gamesAndCategories;

CREATE TABLE games(
game_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name VARCHAR(255) NOT NULL
);

INSERT INTO games (name)
VALUES
    ('COD'),
    ('WITCHER');

CREATE TABLE categories(
category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name VARCHAR(255) NOT NULL
);

INSERT INTO categories (name)
VALUES
    ('FPS'),
    ('RPG'),
    ('Online');

CREATE TABLE gamesAndCategories(
id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
game_id INT NOT NULL,
category_id INT NOT NULL,
CONSTRAINT fk_game
    FOREIGN KEY(game_id)
        REFERENCES games(game_id),
CONSTRAINT fk_category
    FOREIGN KEY(category_id)
        REFERENCES categories(category_id)
);

INSERT INTO gamesAndCategories (game_id, category_id)
VALUES 
    (1, 2),
    (1, 3),
    (2, 2);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${argv[2]}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();