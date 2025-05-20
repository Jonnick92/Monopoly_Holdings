import { Routes } from '@angular/router';
import { GameViewComponent } from './game-view/game-view.component';

export const routes: Routes = [
    { path: 'game-view', component: GameViewComponent },
    { path: '**', redirectTo: 'game-view' }
];
