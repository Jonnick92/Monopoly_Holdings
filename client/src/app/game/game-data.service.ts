import { computed, Injectable, signal } from "@angular/core";
import { GameData } from "./game.model";

@Injectable({
    providedIn: 'root'
})

export class GameDataService {
    private gameData = signal<GameData>({
        gameId: 0,
        players: [],
        activePlayer: 0,
        userPlayerId: 0,
        gameStatus: 'waiting',
        diceResults: [0, 0]
    });

    currentPlayerName = computed(() => {
        const activePlayerId = this.gameData().activePlayer;
        return this.gameData().players.find(player => player.id === activePlayerId)?.name || null;
    });

    ownPlayer = computed(() => {
        const userPlayerId = this.gameData().userPlayerId;
        return this.gameData().players.find(player => player.id === userPlayerId) || null;
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
        this.gameData.update(data => ({
            ...data,
            userPlayerId: playerId
        }));
    }

}