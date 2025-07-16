import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { color_map } from './colors';

@Injectable({
	providedIn:'root',
})

export class ApiService {
	private apiUrl = 'api';

    constructor(private http: HttpClient) {
        console.log('API URL:', this.apiUrl);
	}

    throwDice(gmaeId: number, playerId: number) {
        console.log("Dice thrown");
		//regular apicall goes here 
	}

    games_get(){
        this.http.post(`${this.apiUrl}/v1/games_get`, null).subscribe({
            next: (data) => {
                console.log('Games data:', data);
                return data;
            },
            error: (error) => {
                console.log('ERROR', error);
            }
        });
    }

    games_create(){
        this.http.post(`${this.apiUrl}/v1/games_get`, null).subscribe({
            next: (data) => {
                console.log('Created Game with ID: ', data);
                return data;
            },
            error: (error) => {
                console.log('ERROR', error);
            }
        })
    } 
    
    games_delete(gmaeId: number){
        const headers = new HttpHeaders({'game_id': gmaeId.toString()});
        this.http.post(`${this.apiUrl}/v1/games_delete`, null, { headers }).subscribe({
            next: (data) => {
                console.log('Deletet Game: ', data);
                return data;
            },
            error: (error) => {
                console.log('ERROR', error);
            }
        })
    }

    player_create(gmaeId: number, playerName: string, playerColor: string){
        //Check if color exists on the server
        if (!color_map[playerColor.toLowerCase()]) {
            console.error(`Invalid color: ${playerColor}. Available colors:`, Object.keys(color_map));
            return;
        }

        const headers = new HttpHeaders({'name': playerName, 'color': playerColor.toLowerCase(), 'game_id': gmaeId.toString()});
        this.http.post(`${this.apiUrl}/v1/player_create`, { headers }).subscribe({
            next: (data) => {
                console.log('Created Player:', data);
                return data;
            },
            error: (error) => {
                console.log('ERROR', error);
            }
        });
    }

    player_gett(gameId: number, playerId: number){
        const headers = new HttpHeaders({'game_id': gameId.toString(), 'player_id': playerId.toString()});
        this.http.post(`${this.apiUrl}/v1/player_get`, { headers }).subscribe({
            next: (data) => {
                console.log('Player:', data);
                return data;
            },
            error: (error) => {
                console.log('ERROR', error);
            }
        });
    }

    player_delete(gameId: number, playerId: number){
        const headers = new HttpHeaders({'game_id': gameId.toString(), 'player_id': playerId.toString()});
        this.http.post(`${this.apiUrl}/v1/player_get`, { headers }).subscribe({
            next: (data) => {
                console.log('Player:', data);
                return data;
            },
            error: (error) => {
                console.log('ERROR', error);
            }
        });
    }
}