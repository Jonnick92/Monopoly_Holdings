import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const GameParamsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    
    const gameId = route.queryParams['gameId'];
    const playerId = route.queryParams['playerId'];
    
    // Check if both parameters exist
    if (!gameId || !playerId) {
        console.warn('Missing required query parameters: gameId and playerId');
        router.navigate(['/'], { 
            queryParams: { 
                error: 'missing-params',
                message: 'Game ID and Player ID are required' 
            }
        });
        return false;
    }
    
    // Validate numeric values
    const gameIdNum = +gameId;
    const playerIdNum = +playerId;
    
    if (isNaN(gameIdNum) || isNaN(playerIdNum) || gameIdNum <= 0 || playerIdNum <= 0) {
        console.warn('Invalid query parameters: gameId and playerId must be positive numbers');
        router.navigate(['/'], { 
            queryParams: { 
                error: 'invalid-params',
                message: 'Invalid game or player ID' 
            }
        });
        return false;
    }
    
    return true;
};