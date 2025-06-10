import { Routes } from '@angular/router';
import { GameViewComponent } from './game/game-view/game-view.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'game-view', component: GameViewComponent },
    { path: '', component: AppComponent },
    { path: '**', redirectTo: '' }
];
