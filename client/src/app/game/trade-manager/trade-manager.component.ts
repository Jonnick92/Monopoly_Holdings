import { Component, inject, OnInit, signal } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProperty } from '../game.model';
import { TradeManagerPropertiesComponent } from "./trade-manager-properties/trade-manager-properties.component";
import { TradeService } from './trade.service';
import { TradeManagerMoneyComponent } from "./trade-manager-money/trade-manager-money.component";

@Component({
  selector: 'app-trade-manager',
  imports: [CommonModule, FormsModule, TradeManagerPropertiesComponent, TradeManagerMoneyComponent],
  templateUrl: './trade-manager.component.html',
  styleUrl: './trade-manager.component.css',
  providers: [TradeService]
})
export class TradeManagerComponent implements OnInit {
  gameService = inject(GameDataService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  tradeService = inject(TradeService);

  gameId: number = 0;
  playerId = this.tradeService.playerId;
  tradePartnerId = this.tradeService.tradePartnerId;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = +params['gameId'] || 0;
      this.playerId.set(+params['playerId'] || 0);
    });
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
    return this.gameService.getPlayerById(this.tradePartnerId());
  }

  selectTradePartner(playerId: number) {
    if(this.tradePartnerId() === playerId){
      this.tradePartnerId.set(0);
    }
    else{
      this.tradePartnerId.set(playerId);
    }
  }
  
  onCancelRequestClick(){
    this.router.navigate(['/game/view'], {queryParamsHandling: "preserve"});
  }

  onRequestTradeClick(){
    this.tradeService.sendTradeRequest();
    this.router.navigate(['/game/view'], {queryParamsHandling: "preserve"});
  }
}
