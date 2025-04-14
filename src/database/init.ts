import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
export { GAME_FIELD, Provider, TrainStation, Property, CommunityField, EventField } from './houses';
export { EVENT_CARDS, COMMUNITY_CARDS, Card } from './cards';

async function initDatabase() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS games (
            game_id INTEGER NOT NULL PRIMARY KEY,
            player_turn INTEGER DEFAULT -1
        );

        CREATE TABLE IF NOT EXISTS players (
            game_id INTEGER NOT NULL,
            player_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            color TEXT NOT NULL,
            figure TEXT NOT NULL,
            is_holding BOOLEAN DEFAULT 0,
            money INTEGER NOT NULL,
            position INTEGER NOT NULL,
            in_jail BOOLEAN DEFAULT 0,
            jail_free_cards INTEGER DEFAULT 0,

            FOREIGN KEY(game_id) REFERENCES games(game_id),
            PRIMARY KEY(game_id, player_id)
        );

        CREATE TABLE IF NOT EXISTS player_properties (
            property_id INTEGER NOT NULL,
            player_id INTEGER NOT NULL,
            game_id INTEGER NOT NULL,
            houses INTEGER DEFAULT 0,
            mortgaged BOOLEAN DEFAULT 0,

            FOREIGN KEY(game_id, player_id) REFERENCES players(game_id, player_id),
            PRIMARY KEY(property_id, player_id, game_id)
        );

        CREATE TABLE IF NOT EXISTS holdings (
            game_id INTEGER NOT NULL,
            holding_id INTEGER NOT NULL,
            player_id INTEGER NOT NULL,
            player_shares REAL,

            FOREIGN KEY(game_id, holding_id) REFERENCES players(game_id, player_id),
            FOREIGN KEY(game_id, player_id) REFERENCES players(game_id, player_id),
            PRIMARY KEY(game_id, holding_id, player_id)
        );
    `);

    //await db.run(``);
    const games = await db.all(`SELECT * FROM games`);
    console.log('Games:', games);

    const players = await db.all(`SELECT * FROM players`);
    console.log('Players:', players);

    const playerProperties = await db.all(`SELECT * FROM player_properties`);
    console.log('Player Properties:', playerProperties);

    const holdings = await db.all(`SELECT * FROM holdings`);
    console.log('Holdings:', holdings);

    await db.close();
}

export async function setupDatabase() {
    initDatabase().catch((err) => {
        console.error('Error initializing the database:', err);
        }
    );
}