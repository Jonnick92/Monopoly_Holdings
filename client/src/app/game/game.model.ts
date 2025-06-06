export interface Property{
    id: number;
    name: string;
    assetId: number;
}

export interface Player {
    id: number;
    name: string;
    color: string;
    balance: number;
    position: number;
    properties: Property[];
    isActive: boolean;
}

export interface GameData {
    gameId: number;
    players: Player[];
    activePlayer: number;
    userPlayerId: number;
    gameStatus: 'waiting' | 'active';
    diceResults: [number, number];
}
