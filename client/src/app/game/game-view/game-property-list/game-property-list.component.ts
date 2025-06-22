import { Component, inject } from '@angular/core';
import { GameDataService } from '../../game-data.service';
import { Property } from '../../game.model';

@Component({
  selector: 'app-game-property-list',
  imports: [],
  templateUrl: './game-property-list.component.html',
  styleUrl: './game-property-list.component.css'
})
export class GamePropertyListComponent {
  gameService = inject(GameDataService);
  properties: Property[] = [];

  ngOnInit(): void {
    const ownProperties = this.gameService.ownProperties();
    if (ownProperties) {
      this.properties = [...ownProperties].sort((a, b) => a.id - b.id);
    } else {
      this.properties = [];
    }
  }}