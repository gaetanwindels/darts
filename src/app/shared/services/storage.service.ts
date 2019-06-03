import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  KEY_PLAYERS = "players";

  players : string[];

  constructor() { }

  getPlayers() : string[] {
    return JSON.parse(localStorage.getItem(this.KEY_PLAYERS)) || [];
  }

  storePlayers(players: string[]) {
    localStorage.setItem(this.KEY_PLAYERS, JSON.stringify(players));
  }
}
