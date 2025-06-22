import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  router = inject(Router);

  //Just some dummy code for testing purposes
  dummyPlayerId = 1;
  dummyGameId = 1;

  navigateToGameView() {
    this.router.navigate(['/game-view'], {
      queryParams: { gameid: this.dummyGameId, playerId: this.dummyPlayerId }
    });
  }
}