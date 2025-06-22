import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn:'root',
})

export class ApiService {
	private apiUrl : string;

    constructor(private http: HttpClient) {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        this.apiUrl = `${protocol}//${hostname}/api`;
        console.log('API URL:', this.apiUrl);
	}

    throwDice(gameId: number, playerId: number) {
        console.log("Dice thrown");
		//regular apicall goes here 
	}
}
