import { Injectable } from '@angular/core';
import { GameState } from '../model/game-state';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  KEY_PLAYERS = "players";
  KEY_GAME_STATE = "gameState";

  players: string[];

  constructor() { }

  getPlayers(): string[] {
    return JSON.parse(localStorage.getItem(this.KEY_PLAYERS)) || [];
  }

  storePlayers(players: string[]) {
    localStorage.setItem(this.KEY_PLAYERS, JSON.stringify(players));
  }

  getGameState(): GameState {
    return JSON.parse(localStorage.getItem(this.KEY_GAME_STATE));
  }

  storeGameState(gameState: GameState) {
    localStorage.setItem(this.KEY_GAME_STATE, JSON.stringify(gameState));
  }
}
