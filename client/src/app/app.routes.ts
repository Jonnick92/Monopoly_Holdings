import { Routes } from '@angular/router';
import { GameViewComponent } from './game/game-view/game-view.component';
import { OverviewComponent } from './overview/overview.component';
import { TradeManagerComponent } from './game/trade-manager/trade-manager.component';
import { GameParamsGuard } from './guards/game-params.guards';
import { PlayerDetailComponent } from './game/player-detail/player-detail.component';

export const routes: Routes = [
    { path: 'game-view', component: GameViewComponent, canActivate: [GameParamsGuard] },
    { path: 'game-view/trade-manager', component: TradeManagerComponent, canActivate: [GameParamsGuard] },
    { path: 'game-view/player-detail', component: PlayerDetailComponent, canActivate: [GameParamsGuard] },
    { path: '', component: OverviewComponent },
    { path: '**', redirectTo: '' }
];
