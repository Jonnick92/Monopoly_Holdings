import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  router = inject(Router);
  route = inject(ActivatedRoute)

  //Just some dummy code for testing purposes
  dummyPlayerId = 1;
  dummyGameId = 1;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        if (params['error']) {
            // Show error message to user
            console.error(params['message']);
            // Or display in UI
        }
    });
  }

  navigateToGameView() {
    this.router.navigate(['/game/view'], {
      queryParams: { gameId: this.dummyGameId, playerId: this.dummyPlayerId }
    });
  }
}