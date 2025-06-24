import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
import { UserProperty } from '../../game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-property-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-property-list.component.html',
  styleUrl: './game-property-list.component.css'
})
export class GamePropertyListComponent implements OnInit {
  gameService = inject(GameDataService);
  router = inject(Router);
  properties: UserProperty[] = [];
  selectedProperty: UserProperty | null = null;
  showOverlay = false;

  ngOnInit(): void {
    const ownProperties = this.gameService.ownProperties();
    if (ownProperties) {
      this.properties = [...ownProperties].sort((a, b) => a.property.id - b.property.id);
    } else {
      this.properties = [];
    }
  }

  onPropertyClick(userProperty: UserProperty): void {
    this.selectedProperty = userProperty;
    this.showOverlay = true;
  }

  closeOverlay(): void {
    this.showOverlay = false;
    this.selectedProperty = null;
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

  }

  onDischargeClick() {
    
  }
}