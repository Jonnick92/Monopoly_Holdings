import { Routes } from '@angular/router';
import { GameViewComponent } from './game/game-view/game-view.component';
import { OverviewComponent } from './overview/overview.component';

export const routes: Routes = [
    { path: 'game-view', component: GameViewComponent },
    { path: '', component: OverviewComponent },
    { path: '**', redirectTo: '' }
];
