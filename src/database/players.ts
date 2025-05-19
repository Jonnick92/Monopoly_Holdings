import { get_database } from "./init";

export async function get_players(game_id: number) {
    const db = await get_database();
    const players = await db.all(
        `
        SELECT
            p.*,
            COALESCE(
                (SELECT json_group_array(json_object(
                    'property_id', pp.property_id,
                    'houses', pp.houses,
                    'mortgaged', pp.mortgaged
                ))
                    FROM player_properties pp
                    WHERE pp.game_id = p.game_id AND pp.player_id = p.player_id
                ), '[]'
            ) AS properties,
            COALESCE(
                (SELECT json_group_array(json_object(
                    'holding_id', h.holding_id,
                    'player_shares', h.player_shares
                ))
                    FROM holdings h
                    WHERE h.game_id = p.game_id AND h.player_id = p.player_id
                ), '[]'
            ) AS holding_shares
        FROM players p
        WHERE p.game_id = ?
        ORDER BY p.player_id;
        `,
        [game_id]
    );
    await db.close();
    return players;
}
