import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDataService } from '../game-data.service';
import { GamePlayerListComponent } from "./game-player-list/game-player-list.component";
import { ApiService } from '../../api.service';
import { GamePropertyListComponent } from "./game-property-list/game-property-list.component";

@Component({
  standalone: true,
  selector: 'app-game-view',
  imports: [GamePlayerListComponent, GamePropertyListComponent],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent implements OnInit{
  router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedDataField: number = 0;
  gameService = inject(GameDataService);
  apiService = inject(ApiService);

  gameId: number = 0;
  playerId: number = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = +params['gameId'] || 0;
      this.playerId = +params['playerId'] || 0;
    });
    console.log(`Game ID: ${this.gameId}, Player ID: ${this.playerId}`);
    this.gameService.initializeGameData(); // Initialize game data with dummy data
    this.gameService.setUserPlayerId(this.playerId); 
 }

  onButtonNextClick() {
    this.selectedDataField = ++this.selectedDataField % 3;
  }

  onButtonPreviousClick() {
    this.selectedDataField--;
    if (this.selectedDataField < 0) {
      this.selectedDataField = 2;
    }
  }

  onThrowDiceClick(){
    this.apiService.throwDice(this.gameId, this.playerId);
  }
}
