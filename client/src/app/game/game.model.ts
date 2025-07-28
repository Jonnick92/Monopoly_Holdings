export interface Property {
    id: number;
    name: string;
    assetId: number;
    color?: string;
    mortageValue: number;
    amountColorProperties?: number;
    developable: boolean;
}

export interface UserProperty {
    property : Property,
    houses : number,
    mortaged : boolean
}

export interface Player {
    id: number;
    name: string;
    color: string;
    balance: number;
    position: number;
    properties: UserProperty[];
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
