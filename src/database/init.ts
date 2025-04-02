import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to initialize the database
async function initDatabase() {
    // Open a database connection
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    // Create a table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);

    // Insert sample data
    await db.run(`INSERT INTO users (name) VALUES (?)`, ['John Doe']);
    await db.run(`INSERT INTO users (name) VALUES (?)`, ['Jane Smith']);

    // Query the data
    const users = await db.all(`SELECT * FROM users`);
    console.log('Users:', users);

    // Close the database connection
    await db.close();
}

export async function setupDatabase() {
    // Initialize the database
    initDatabase().catch((err) => {
        console.error('Error initializing the database:', err);
    });
}