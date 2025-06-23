import { Component, inject } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-player-detail',
  imports: [],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent {
  gameService = inject(GameDataService);
}
