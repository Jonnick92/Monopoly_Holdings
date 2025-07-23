import { Component, computed, effect, inject, input, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameDataService } from '../../game-data.service';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-trade-manager-money',
  imports: [FormsModule],
  templateUrl: './trade-manager-money.component.html',
  styleUrl: './trade-manager-money.component.css'
})
export class TradeManagerMoneyComponent {
  gameService = inject(GameDataService);
  tradeService = inject(TradeService);
  
  playerId = input.required<Signal<number>>();
  tradePartner = input.required<boolean>();

  readonly playerMoney = computed(() => {
    return this.tradePartner() ? this.tradeService.tradePartnerMoney : this.tradeService.playerMoney;
  });
  readonly playerName: Signal<string> = computed(() => {
    return this.gameService.getPlayerById(this.playerId()())?.name ?? '-';
  })
  readonly playerAvailableMoney: Signal<number> = computed(() => {
    return this.gameService.getPlayerById(this.playerId()())?.balance ?? 0;
  })

  readonly displayValue = computed(() => {
    const value = this.playerMoney()();
    return value === 0 ? '' : value.toString();
  });

  constructor() {
    effect(() => {
      const currentPlayerId = this.playerId()();
      this.playerMoney().set(0);
    });
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.trim();
    
    if (inputValue === '') {
      this.playerMoney().set(0);
      return;
    }
    
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      input.value = '';
      this.playerMoney().set(0);
      return;
    }
    
    const maxMoney = this.playerAvailableMoney();
    const clampedValue = Math.max(0, Math.min(value, maxMoney));
    
    if (clampedValue !== value) {
      input.value = clampedValue === 0 ? '' : clampedValue.toString();
    }
    
    this.playerMoney().set(clampedValue);
  }

  onModelChange(value: string) {
    if (value.trim() === '') {
      this.playerMoney().set(0);
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      this.playerMoney().set(0);
      return;
    }
    
    const maxMoney = this.playerAvailableMoney();
    const clampedValue = Math.max(0, Math.min(numValue, maxMoney));
    this.playerMoney().set(clampedValue);
  }

  get moneyOffer(): number {
    return this.playerMoney()();
  }

  set moneyOffer(value: number) {
    const maxMoney = this.playerAvailableMoney();
    const clampedValue = Math.max(0, Math.min(value, maxMoney));
    this.playerMoney().set(clampedValue);
  }
}