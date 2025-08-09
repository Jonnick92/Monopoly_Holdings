import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameDataService } from '../game-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player, UserProperty } from '../game.model';

@Component({
  selector: 'app-holding-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './holding-creator.component.html',
  styleUrl: './holding-creator.component.css'
})
export class HoldingCreatorComponent {
  gameService = inject(GameDataService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  playerPropertySelections = signal<Map<number, number[]>>(new Map());
  playerMoneyInputs = signal<Map<number, number>>(new Map());
  playerShareInputs = signal<Map<number, number>>(new Map());

  readonly players = computed(() => {
    return this.gameService.gameData().players;
  });

  readonly canRequestHolding = computed<boolean>(() => {
    const shares = this.playerShareInputs();
    if (shares.size === 0) {
      return false;
    }
    
    let sumShares = 0;
    for (const [playerId, shareValue] of shares) {
      if (shareValue > 0) {
        sumShares += shareValue;
      }
    }
    
    return sumShares === 100;
  });

  getPlayerProperties(playerId: number): UserProperty[] {
    const player = this.gameService.getPlayerById(playerId);
    return player?.properties || [];
  }

  isPropertySelected(playerId: number, propertyId: number): boolean {
    const selections = this.playerPropertySelections().get(playerId) || [];
    return selections.includes(propertyId);
  }

  togglePropertySelection(playerId: number, propertyId: number): void {
    this.playerPropertySelections.update(current => {
      const newMap = new Map(current);
      const currentSelections = newMap.get(playerId) || [];
      
      if (currentSelections.includes(propertyId)) {
        newMap.set(playerId, currentSelections.filter(id => id !== propertyId));
      } else {
        newMap.set(playerId, [...currentSelections, propertyId]);
      }
      
      return newMap;
    });
  }

  getPlayerMoneyInput(playerId: number): number {
    return this.playerMoneyInputs().get(playerId) || 0;
  }

  setPlayerMoneyInput(playerId: number, value: number): void {
    this.playerMoneyInputs.update(current => {
      const newMap = new Map(current);
      newMap.set(playerId, value);
      return newMap;
    });
  }

  getPlayerShareInput(playerId: number): number {
    return this.playerShareInputs().get(playerId) || 0;
  }

  setPlayerShareInput(playerId: number, value: number): void {
    this.playerShareInputs.update(current => {
      const newMap = new Map(current);
      newMap.set(playerId, value);
      return newMap;
    });
  }

  onMoneyInputChange(playerId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setPlayerMoneyInput(playerId, +target.value);
  }

  onShareInputChange(playerId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setPlayerShareInput(playerId, +target.value);
  }

  onCancelFundingClick(){
    this.router.navigate(['game/view'], {queryParamsHandling: "preserve"});
  }
  
  onFundHoldingClick(){
    //TODO: Implement call to GameService and API-Call
  }
}