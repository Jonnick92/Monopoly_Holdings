import express from 'express';
import { IncomingHttpHeaders } from 'http';

export async function apiHandler(req: express.Request, res: express.Response) {
    if (!req.params.name) {
        res.send('API v1 is running!');
        return;
    }

    const data = req.headers;

    switch (req.params.name) {
        case 'player_create':
            player_create(res, data);
            return;
        case 'games':
            res.sendStatus(501);
            return;
        case 'play':
            res.sendStatus(501);
            return;
        default:
            res.sendStatus(404).send('Unknown API endpoint!');
            return;
    }
}

async function player_create(res: express.Response, params: IncomingHttpHeaders) {
    const name = params['name'];
    const color = params['color'];

    if (!name || !color) {
        res.sendStatus(400).send('Missing name or color!');
        return;
    }



    res.sendStatus(501);
}