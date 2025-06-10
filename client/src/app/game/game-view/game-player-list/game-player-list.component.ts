import { Component, inject } from '@angular/core';
import { GameDataService } from '../../game-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-player-list',
  imports: [CommonModule],
  templateUrl: './game-player-list.component.html',
  styleUrl: './game-player-list.component.css'
})
export class GamePlayerListComponent {
  gameService = inject(GameDataService);

  // Get all players except the current user
  getOtherPlayers() {
    const userPlayerId = this.gameService.ownPlayer();
    return this.gameService.gameData().players.filter(player => player.id !== userPlayerId);
  }
}
