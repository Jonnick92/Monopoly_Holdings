import { Component, inject } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-trade-manager',
  imports: [],
  templateUrl: './trade-manager.component.html',
  styleUrl: './trade-manager.component.css'
})
export class TradeManagerComponent {
  gameService = inject(GameDataService);
}
