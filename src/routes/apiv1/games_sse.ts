import express from 'express';
import { IncomingHttpHeaders } from 'http';
import { get_database } from '../../database/init';

let clients = new Map<number, Map<String, express.Request>>();

export async function game_updates(res: express.Response, req: express.Request, params: IncomingHttpHeaders) {
    let game_id = params['game_id'];
    let name = params['name']?.toString() || '';

    if (!(game_id && name && name !== '')) {
        res.status(404).send('Missing game_id or name!');
        return;
    }

    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    res.write(`retry: 1000\n\n`);

    clients.set(Number(game_id), new Map<String, express.Request>());
    clients.get(Number(game_id))?.set(name, req);
    console.log('Client connected:', game_id, name);

    req.once('close', () => {
        for (const [gameId, clientMap] of clients.entries()) {
            if (clientMap.has(name)) {
                clientMap.delete(name);
                console.log('Client disconnected:', gameId, name);
                if (clientMap.size === 0) {
                    clients.delete(gameId);
                }
            }
        }
    });
}
