import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root',
})

export class SseService {
    private apiUrl = 'api';

    constructor(private http: HttpClient) {
        console.log('API URL:', this.apiUrl);
	}
    
    get_updates_sse(gameId: number, name: string): EventSource {
    const url = `${this.apiUrl}/v1/get_updates?game_id=${gameId}&name=${encodeURIComponent(name)}`;
    return new EventSource(url);
}
}