import express from 'express';
import { IncomingHttpHeaders } from 'http';
import { get_database } from '../../database/init';

export const color_map: Record<string, string> = {
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#00FF00',
    'yellow': '#FFFF00',
    'purple': '#800080',
    'orange': '#FFA500',
    'black': '#000000',
    'white': '#FFFFFF'
};

export async function player_create(res: express.Response, params: IncomingHttpHeaders) {
    const name = params['name'];
    const game_id = params['game_id'];
    const color = params['color'] as string;
    const color_name = color.toString().toLowerCase();

    if (!name || !color || !game_id) {
        res.status(400).send('Missing name, color or game_id!');
        return;
    }

    if (name.length > 20) {
        res.status(400).send('Name too long!');
        return;
    }

    if (!color_map[color_name]) {
        res.status(400).send('Invalid color!');
        return;
    }
    const db = await get_database();
    const player_count = await db.get(`SELECT COUNT(*) AS count FROM players WHERE game_id = ?`, [game_id]);

    db.run(`INSERT INTO players (game_id, player_id, name, color, figure, money, position) VALUES (?, ?, ?, ?, ?, ?, ?)`, [game_id, player_count.count + 1, name, color_map[color_name], 'car', 1500, 0]);
    const player_id = await db.get('SELECT last_insert_rowid() AS player_id;');

    if (!player_id) {
        res.status(500).send('Failed to create player!');
        return;
    }

    console.log('Player created:', player_id.player_id);
    res.send({ player_id: player_id.player_id, game_id: game_id });
}

export async function player_delete(res: express.Response, params: IncomingHttpHeaders) {
    const name = params['name'];
    const player_id = params['player_id'];
    const game_id = params['game_id'];

    if (!name && !player_id) {
        res.status(400).send('Missing Player Identifier!');
        return;
    }

    if (!game_id) {
        res.status(400).send('Missing game_id!');
        return;
    }

    const db = await get_database();
    if (name) {
        db.run(`DELETE FROM players WHERE name = ? AND game_id = ?`, [name, game_id]);
    } else {
        db.run(`DELETE FROM players WHERE player_id = ? AND game_id = ?`, [player_id, game_id]);
    }

    console.log('Player deleted:', player_id);
    res.sendStatus(200);
    return;
}

export async function player_get(res: express.Response, params: IncomingHttpHeaders) {
    const name = params['name'];
    const player_id = params['player_id'];
    const game_id = params['game_id'];

    if (!game_id) {
        res.status(400).send('Missing game_id!');
        return;
    }

    const db = await get_database();

    if (!name && !player_id) {
        const players = await db.all(`SELECT * FROM players WHERE game_id = ?`, [game_id]);
        console.log('Players:', players);

        if (!players) {
            res.status(404).send('Player not found!');
            return;
        }

        res.send(players);
        return;
    }

    if (name) {
        const player = await db.get(`SELECT * FROM players WHERE name = ? AND game_id = ?`, [name, game_id]);
        console.log('Player:', player);

        if (!player) {
            res.status(404).send('Player not found!');
            return;
        }

        res.send(player);
        return;
    } else {
        const player = await db.get(`SELECT * FROM players WHERE player_id = ? AND game_id = ?`, [player_id, game_id]);
        console.log('Player:', player);

        if (!player) {
            res.status(404).send('Player not found!');
            return;
        }

        res.send(player);
        return;
    }
}