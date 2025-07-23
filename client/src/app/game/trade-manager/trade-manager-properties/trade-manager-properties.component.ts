import { Component, computed, effect, inject, input, OnInit, Signal, Output, EventEmitter } from '@angular/core';
import { GameDataService } from '../../game-data.service';
import { UserProperty } from '../../game.model';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-trade-manager-properties',
  imports: [],
  templateUrl: './trade-manager-properties.component.html',
  styleUrl: './trade-manager-properties.component.css'
})
export class TradeManagerPropertiesComponent{
  gameService = inject(GameDataService);
  tradeService = inject(TradeService);
  playerId = input.required<Signal<number>>();
  tradePartner = input.required<boolean>();
    
  readonly playerProperties: Signal<UserProperty[]> = computed(() => {
    return this.gameService.getPlayerById(this.playerId()())?.properties.sort((a, b) => a.property.id - b.property.id) || [];
  })

  constructor() {
    effect(() => {
      this.playerId()();
      const targetSignal = this.tradePartner() ? this.tradeService.tradePartnerSelectedProperties : this.tradeService.playerSelectedProperties;
      targetSignal.set([]);
    });
  }

  isPlayerPropertySelected(propertyId: number): boolean {
    const targetSignal = this.tradePartner() ? this.tradeService.tradePartnerSelectedProperties : this.tradeService.playerSelectedProperties;
    return targetSignal().includes(propertyId);
  }

  togglePlayerPropertySelection(propertyId: number) {
    const targetSignal = this.tradePartner() ? this.tradeService.tradePartnerSelectedProperties : this.tradeService.playerSelectedProperties;
    targetSignal.update(currentSelected => {
      if (currentSelected.includes(propertyId)) {
        return currentSelected.filter(id => id !== propertyId);
      } else {
        return [...currentSelected, propertyId];
      }
    });
  }
}