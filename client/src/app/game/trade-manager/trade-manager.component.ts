import { Component, inject, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProperty } from '../game.model';

@Component({
  selector: 'app-trade-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './trade-manager.component.html',
  styleUrl: './trade-manager.component.css'
})
export class TradeManagerComponent implements OnInit {
  gameService = inject(GameDataService);
  route = inject(ActivatedRoute);

  gameId: number = 0;
  playerId: number = 0;
  tradePartnerId: number = 0;

  playerProperties: UserProperty[] = [];
  tradePartnerProperties: UserProperty[] = [];

  selectedPlayerProperties: Set<number> = new Set();
  selectedTradePartnerProperties: Set<number> = new Set();
  
  playerMoneyOffer: number = 0;
  tradePartnerMoneyOffer: number = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = +params['gameId'] || 0;
      this.playerId = +params['playerId'] || 0;
    });
    const ownProperties = this.gameService.ownProperties();
    if (ownProperties) {
      this.playerProperties = [...ownProperties].sort((a, b) => a.property.id - b.property.id);
    } else {
      this.playerProperties = [];
    }
  }

  get otherPlayers() {
    const gameData = this.gameService.gameData();
    const currentUserId = this.gameService.ownPlayerId();
    if (!gameData || !gameData.players) {
      return [];
    }  
    return gameData.players.filter(player => player.id !== currentUserId);
  }

  get currentPlayer() {
    return this.gameService.getPlayerById(this.gameService.ownPlayerId());
  }

  get selectedTradePartner() {
    return this.gameService.getPlayerById(this.tradePartnerId);
  }

  get maxPlayerMoney() {
    return this.currentPlayer?.balance || 0;
  }

  get maxTradePartnerMoney() {
    return this.selectedTradePartner?.balance || 0;
  }

  togglePlayerPropertySelection(propertyId: number) {
    if (this.selectedPlayerProperties.has(propertyId)) {
      this.selectedPlayerProperties.delete(propertyId);
    } else {
      this.selectedPlayerProperties.add(propertyId);
    }
  }

  toggleTradePartnerPropertySelection(propertyId: number) {
    if (this.selectedTradePartnerProperties.has(propertyId)) {
      this.selectedTradePartnerProperties.delete(propertyId);
    } else {
      this.selectedTradePartnerProperties.add(propertyId);
    }
  }

  isPlayerPropertySelected(propertyId: number): boolean {
    return this.selectedPlayerProperties.has(propertyId);
  }

  isTradePartnerPropertySelected(propertyId: number): boolean {
    return this.selectedTradePartnerProperties.has(propertyId);
  }

  selectTradePartner(playerId: number) {
    if(this.tradePartnerId === playerId){
      this.tradePartnerId = 0;
      this.tradePartnerMoneyOffer = 0;
      this.selectedTradePartnerProperties.clear();
    }
    else{
      this.tradePartnerId = playerId;
      this.tradePartnerMoneyOffer = 0;
      this.selectedPlayerProperties.clear();
    }
    this.tradePartnerProperties = this.gameService.getPlayerById(this.tradePartnerId)?.properties.sort((a, b) => a.property.id - b.property.id) || [];
  }

  onPlayerMoneyChange() {
    if (this.playerMoneyOffer > this.maxPlayerMoney) {
      this.playerMoneyOffer = this.maxPlayerMoney;
    }
    if (this.playerMoneyOffer < 0) {
      this.playerMoneyOffer = 0;
    }
  }

  onTradePartnerMoneyChange() {
    if (this.tradePartnerMoneyOffer > this.maxTradePartnerMoney) {
      this.tradePartnerMoneyOffer = this.maxTradePartnerMoney;
    }
    if (this.tradePartnerMoneyOffer < 0) {
      this.tradePartnerMoneyOffer = 0;
    }
  }

  canRequestTrade(): boolean {
    // Must have selected a trade partner
    if (this.tradePartnerId === 0) {
      return false;
    }

    // Must have at least one property selected or money offered from either side
    const hasPlayerOffer = this.selectedPlayerProperties.size > 0 || this.playerMoneyOffer > 0;
    const hasTradePartnerOffer = this.selectedTradePartnerProperties.size > 0 || this.tradePartnerMoneyOffer > 0;
    
    return hasPlayerOffer && hasTradePartnerOffer;
  }

  requestTrade() {
    if (!this.canRequestTrade()) {
      return;
    }
    const tradeRequest = {
      gameId: this.gameId,
      requestingPlayerId: this.playerId,
      targetPlayerId: this.tradePartnerId,
      requestingPlayerProperties: Array.from(this.selectedPlayerProperties),
      targetPlayerProperties: Array.from(this.selectedTradePartnerProperties),
      requestingPlayerMoney: this.playerMoneyOffer,
      targetPlayerMoney: this.tradePartnerMoneyOffer
    };
    // TODO: Implement actual trade request API call
    alert('Trade request sent! (This is a placeholder - implement actual trade logic)');
  }
}
