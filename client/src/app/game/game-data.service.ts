import { computed, Injectable, OnInit, signal } from "@angular/core";
import { GameData, UserProperty } from "./game.model";
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

    // Helper method to create UserProperty from Property
    private createUserProperty(property: any): UserProperty {
        return {
            property: property,
            houses: 0,
            mortaged: false
        };
    }

    // Dummy data for testing purposes (replace later with api calls)
    initializeGameData() {
        this._gameData.set({
            gameId: 1,
            players: [
                { 
                    id: 1, 
                    name: 'Testuser 1', 
                    color: 'red', 
                    balance: 200000, 
                    position: 10, 
                    properties: [
                        this.createUserProperty(MONOPOLY_PROPERTIES[2]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[10]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[7]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[6]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[3])
                    ], 
                    isActive: true 
                },
                { 
                    id: 2, 
                    name: 'Testuser 2', 
                    color: 'blue', 
                    balance: 1500, 
                    position: 25, 
                    properties: [
                        this.createUserProperty(MONOPOLY_PROPERTIES[14]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[20]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[8]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[9]),
                        this.createUserProperty(MONOPOLY_PROPERTIES[1])
                    ], 
                    isActive: false 
                },
                { 
                    id: 3, 
                    name: 'Testuser 3', 
                    color: 'green', 
                    balance: 5000, 
                    position: 25, 
                    properties: [], 
                    isActive: false 
                },
                { 
                    id: 4, 
                    name: 'Testuser 4', 
                    color: 'yellow', 
                    balance: 4155, 
                    position: 25, 
                    properties: [], 
                    isActive: false 
                }
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

    ownPlayerId = computed(() => {
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

    dice = computed(() => {
        return this.gameData().diceResults;
    });

    ownProperties = computed(() => {
        return this.getPlayerById(this.ownPlayerId())?.properties
    })

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