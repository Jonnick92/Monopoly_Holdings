import { computed, Injectable, OnInit, signal } from "@angular/core";
import { GameData } from "./game.model";
import { MONOPOLY_PROPERTIES } from "./monopoly-properties";

@Injectable({
    providedIn: 'root'
})

export class GameDataService {
    private _gameData = signal<GameData>({
        gameId: 0,
        players: [],
        activePlayer: 0,
        userPlayerId: 0,
        gameStatus: 'waiting',
        diceResults: [0, 0]
    });

    // Add this getter to expose gameData
    readonly gameData = this._gameData.asReadonly();

    //Dummy data for testing purposes (remplace later with api calls)
    initializeGameData() {
        this._gameData.set({
            gameId: 1,
            players: [
                { id: 1, name: 'Testuser 1', color: 'red', balance: 200000, position: 10, properties: [MONOPOLY_PROPERTIES[2], MONOPOLY_PROPERTIES[10], MONOPOLY_PROPERTIES[7], MONOPOLY_PROPERTIES[6], MONOPOLY_PROPERTIES[3]], isActive: true },
                { id: 2, name: 'Testuser 2', color: 'blue', balance: 1500, position: 25, properties: [MONOPOLY_PROPERTIES[14], MONOPOLY_PROPERTIES[20], MONOPOLY_PROPERTIES[8], MONOPOLY_PROPERTIES[9], MONOPOLY_PROPERTIES[1]], isActive: false },
                { id: 2, name: 'Testuser 3', color: 'green', balance: 5000, position: 25, properties:[], isActive: false },
                { id: 2, name: 'Testuser 4', color: 'yellow', balance: 4155, position: 25, properties: [], isActive: false }
            ],
            activePlayer: 1,
            userPlayerId: 1,
            gameStatus: 'waiting',
            diceResults: [3, 4]
        });
    }

    currentPlayerName = computed(() => {
        const activePlayerId = this.gameData().activePlayer;
        return this.gameData().players.find(player => player.id === activePlayerId)?.name || null;
    });

    ownPlayer = computed(() => {
        return this.gameData().userPlayerId;
    });

    isUserTurn = computed(() => {
        const userPlayerId = this.gameData().userPlayerId;
        return this.gameData().activePlayer === userPlayerId;
    });

    diceOne = computed(() => {
        return this.gameData().diceResults[0];
    });

    diceTwo = computed(() => {
        return this.gameData().diceResults[1];
    });

    setUserPlayerId(playerId: number) {
        this._gameData.update(data => ({
            ...data,
            userPlayerId: playerId
        }));
    }
    getPlayerById(playerId: number) {
        return this.gameData().players.find(player => player.id === playerId) || null;
    }
}