import express from 'express';
import { IncomingHttpHeaders } from 'http';
import { get_database } from '../../database/init';

export async function games_create(res: express.Response, params: IncomingHttpHeaders) {
    const db = await get_database();

    db.run(`INSERT INTO games (player_turn) VALUES (-1);`);
    const game_id = await db.get('SELECT last_insert_rowid() AS game_id;');

    console.log('Game created:', game_id.game_id);
    res.send({ game_id: game_id.game_id });
}

export async function games_delete(res: express.Response, params: IncomingHttpHeaders) {
    const game_id = params['game_id'];

    if (!game_id) {
        res.status(400).send('Missing game_id!');
        return;
    }

    const db = await get_database();
    db.run(`DELETE FROM games WHERE game_id = ?`, [game_id]);

    console.log('Game deleted:', game_id);
    res.sendStatus(200);
}

export async function games_get(res: express.Response, params: IncomingHttpHeaders) {
    const db = await get_database();
    const games = await db.all(`SELECT * FROM games`);

    console.log('Games:', games);
    res.send(games);
}
