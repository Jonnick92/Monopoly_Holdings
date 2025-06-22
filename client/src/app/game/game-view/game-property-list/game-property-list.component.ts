import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
import { Property } from '../../game.model';

@Component({
  selector: 'app-game-property-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-property-list.component.html',
  styleUrl: './game-property-list.component.css'
})
export class GamePropertyListComponent implements OnInit {
  gameService = inject(GameDataService);
  properties: Property[] = [];
  selectedProperty: Property | null = null;
  showOverlay = false;

  ngOnInit(): void {
    const ownProperties = this.gameService.ownProperties();
    if (ownProperties) {
      this.properties = [...ownProperties].sort((a, b) => a.id - b.id);
    } else {
      this.properties = [];
    }
  }

  onPropertyClick(property: Property): void {
    this.selectedProperty = property;
    this.showOverlay = true;
  }

  closeOverlay(): void {
    this.showOverlay = false;
    this.selectedProperty = null;
  }

  onOverlayClick(event: Event): void {
    // Close overlay when clicking on the background
    if (event.target === event.currentTarget) {
      this.closeOverlay();
    }
  }
}