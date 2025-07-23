import { Injectable, computed, inject, signal } from "@angular/core";
import { GameDataService } from "../game-data.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TradeService{
    router = inject(Router);
    gameService = inject(GameDataService);

    playerId = signal(0);
    tradePartnerId = signal(0);
    playerSelectedProperties = signal<number[]>([]);
    tradePartnerSelectedProperties = signal<number[]>([]);
    playerMoney = signal(0);
    tradePartnerMoney = signal(0);

    readonly canRequestTrade = computed<boolean>(() => {
        if (this.tradePartnerId() === 0) {
            return false;
        }
        const playerOffer = this.playerSelectedProperties().length > 0 || this.playerMoney() > 0;
        const tradeParterOffer = this.tradePartnerSelectedProperties().length > 0 || this.tradePartnerMoney() > 0;
        return playerOffer && tradeParterOffer;
    })

    sendTradeRequest() {
        if(!this.canRequestTrade()){
            return;
        }
        const tradeRequest = {
            requestingPlayerId: this.playerId(),
            targetPlayerId: this.tradePartnerId(),
            requestingPlayerProperties: Array.from(this.playerSelectedProperties()),
            targetPlayerProperties: Array.from(this.tradePartnerSelectedProperties()),
            requestingPlayerMoney: this.playerMoney(),
            targetPlayerMoney: this.tradePartnerMoney()
        }
        
        // TODO: Implement actual trade request API call
        alert('Trade Request: ' + JSON.stringify(tradeRequest, null, 2));
        this.router.navigate(['game/view'], {
            queryParamsHandling: 'preserve'
        });
    }
}