import express from 'express';
import { IncomingHttpHeaders } from 'http';
import { player_create, player_delete, player_get } from './player';
import { games_create, games_delete, games_get } from './game';
import { game_updates } from './games_sse';

export async function apiHandler(req: express.Request, res: express.Response) {
    if (!req.params.name) {
        res.send('API v1 is running!');
        return;
    }

    const data = req.headers;

    switch (req.params.name) {
        case 'game_updates':
            game_updates(res, req, data);
            return;
        case 'player_create':
            player_create(res, data);
            return;
        case 'player_delete':
            player_delete(res, data);
            return;
        case 'player_get':
            player_get(res, data);
            return;
        case 'games_create':
            games_create(res, data);
            return;
        case 'games_delete':
            games_delete(res, data);
            return;
        case 'games_get':
            games_get(res, data);
            return;
        default:
            res.sendStatus(404).send('Unknown API endpoint!');
            return;
    }
}