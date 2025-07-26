import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
import { UserProperty } from '../../game.model';
import { Router } from '@angular/router';
import { GamePropertyPopupComponent } from "../game-property-popup/game-property-popup.component";

@Component({
  selector: 'app-game-property-list',
  standalone: true,
  imports: [CommonModule, GamePropertyPopupComponent],
  templateUrl: './game-property-list.component.html',
  styleUrl: './game-property-list.component.css'
})
export class GamePropertyListComponent {
  gameService = inject(GameDataService);
  router = inject(Router);
  properties = computed(() => {
    return this.gameService.ownProperties()?.sort((a, b) => a.property.id - b.property.id) || [];
  })
  
  private selectedPropertyId = signal<number | null>(null);
  selectedProperty = computed(() => {
    const propertyId = this.selectedPropertyId();
    if (propertyId === null) return null;
    return this.properties().find(prop => prop.property.id === propertyId) || null;
  });
  
  showOverlay = false;

  onPropertyClick(userProperty: UserProperty): void {
    this.selectedPropertyId.set(userProperty.property.id);
    this.showOverlay = true;
  }

  onOverlayClose(show: boolean): void {
    this.showOverlay = show;
    if (!show) {
      this.selectedPropertyId.set(null);
    }
  }
}