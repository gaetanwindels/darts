import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedPlayersService {

  players = [];

  constructor() { }

  setPlayers(players: string[]) {
    this.players = players;
  }

  getPlayers() {
    return this.players;
  }
}
