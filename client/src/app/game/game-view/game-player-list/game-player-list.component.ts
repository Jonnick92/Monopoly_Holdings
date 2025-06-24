import { Component, inject } from '@angular/core';
import { GameDataService } from '../../game-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../game.model';

@Component({
  selector: 'app-game-player-list',
  imports: [CommonModule],
  templateUrl: './game-player-list.component.html',
  styleUrl: './game-player-list.component.css'
})
export class GamePlayerListComponent {
  gameService = inject(GameDataService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // Get all players except the current user
  getOtherPlayers() {
    const userPlayerId = this.gameService.ownPlayerId();
    return this.gameService.gameData().players.filter(player => player.id !== userPlayerId);
  }

  onPlayerClick(player: Player) {
    console.log('Player clicked:', player);
    const currentGameId = this.route.snapshot.queryParams['gameId'];
    this.router.navigate(['/game/player'], {
      queryParams: {
        gameId: currentGameId,
        playerId: player.id
      }
    });
  }
}
