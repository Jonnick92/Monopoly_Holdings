import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameViewComponent } from './game/game-view/game-view.component';
import { OverviewComponent } from './overview/overview.component';
import { TradeManagerComponent } from './game/trade-manager/trade-manager.component';
import { GameParamsGuard } from './guards/game-params.guards';
import { PlayerDetailComponent } from './game/player-detail/player-detail.component';
import { HoldingCreatorComponent } from './game/holding-creator/holding-creator.component';

export const routes: Routes = [
    {
    path: 'game',
    component: GameComponent,
    children: [
      { path: 'view', component: GameViewComponent, canActivate: [GameParamsGuard] },
      { path: 'trade', component: TradeManagerComponent, canActivate: [GameParamsGuard] },
      { path: 'player', component: PlayerDetailComponent, canActivate: [GameParamsGuard] },
      { path: 'holding', component: HoldingCreatorComponent, canActivate: [GameParamsGuard]}
    ]},
    { path: '', component: OverviewComponent },
    { path: '**', redirectTo: '' }
];
