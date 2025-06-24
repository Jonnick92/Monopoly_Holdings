import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameDataService } from './game-data.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  providers: [GameDataService]
})
export class GameComponent {
}