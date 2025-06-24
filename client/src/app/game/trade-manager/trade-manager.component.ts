import { Component, inject, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade-manager',
  imports: [CommonModule],
  templateUrl: './trade-manager.component.html',
  styleUrl: './trade-manager.component.css'
})
export class TradeManagerComponent implements OnInit {
  gameService = inject(GameDataService);
  route = inject(ActivatedRoute);

  gameId: number = 0;
  playerId: number = 0;
  tradePartnerId: number = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = +params['gameId'] || 0;
      this.playerId = +params['playerId'] || 0;
    });
  }

  get otherPlayers() {
    const currentUserId = this.gameService.ownPlayerId();
    return this.gameService.gameData().players.filter(player => player.id !== currentUserId);
  }

  selectTradePartner(playerId: number) {
    console.log('Selected trade partner:', playerId);
    this.tradePartnerId = playerId;
  }
}
