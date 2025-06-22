import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [RouterOutlet, FormsModule], // Add FormsModule to imports
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {}
