import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { GameDataService } from './game-data.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  providers: [GameDataService]
})
export class GameComponent implements OnInit {
  private gameService = inject(GameDataService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // Initialize GameService when game component loads
    this.route.queryParams.subscribe(params => {
      const playerId = +params['playerId'] || 0;
      
      if (!this.gameService.isInitialized()) {
        console.log('Initializing GameService...');
        this.gameService.initializeGameData();
      }
      
      if (playerId > 0) {
        this.gameService.setUserPlayerId(playerId);
      }
    });
  }
}