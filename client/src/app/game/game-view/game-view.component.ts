import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { GameDataService } from '../game-data.service';

@Component({
  standalone: true,
  selector: 'app-game-view',
  imports: [RouterOutlet],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  router = inject(Router);
  private route = inject(ActivatedRoute)
  selectedDataField: number = 0;
  gameService = inject(GameDataService);

  gameId: number = 0;
  playerId: number = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'] || 0;
      this.playerId = +params['playerId'] || 0;
    });
    console.log(`Game ID: ${this.gameId}, Player ID: ${this.playerId}`);
    this.gameService.setUserPlayerId(this.playerId);
  }

  onButtonNextClick() {
    this.selectedDataField++;
    this.selectedDataField = this.selectedDataField % 3;
  }

  onButtonPreviousClick() {
    this.selectedDataField--;
    if (this.selectedDataField < 0) {
      this.selectedDataField = 2;
    }
  }
}
