import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-game-view',
  imports: [RouterOutlet],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  selectedDataField: number = 0;

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