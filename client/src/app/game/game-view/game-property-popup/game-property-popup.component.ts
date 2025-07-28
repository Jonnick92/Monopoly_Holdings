import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { GameDataService } from '../../game-data.service';
import { UserProperty } from '../../game.model';

@Component({
  selector: 'app-game-property-popup',
  imports: [],
  templateUrl: './game-property-popup.component.html',
  styleUrl: './game-property-popup.component.css'
})
export class GamePropertyPopupComponent {
  router = inject(Router);
  gameService = inject(GameDataService);
  selectedProperty = input.required<UserProperty>();
  showOverlay = output<boolean>();
  
  // Computed properties
  property = computed(() => this.selectedProperty()?.property);
  houses = computed(() => this.selectedProperty()?.houses ?? 0);
  mortaged = computed(() => this.selectedProperty()?.mortaged ?? false);
  dischargeable = computed(() => this.gameService.getPlayerById(this.gameService.ownPlayerId())?.balance || 0 > this.selectedProperty().property.mortageValue);
  
  closeOverlay(): void {  
    this.showOverlay.emit(false);
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeOverlay();
    }
  }

  onTradePropertyClick() {
    this.router.navigate(['/game/trade'], { 
        queryParamsHandling: 'preserve' 
    });
  }

  onMortgageClick() {
    this.gameService.mortageProperty(this.selectedProperty().property.id);
  }

  onDischargeClick() {
   if(this.dischargeable()){
    this.gameService.dischargeProperty(this.selectedProperty().property.id);
   } 
  }
}
