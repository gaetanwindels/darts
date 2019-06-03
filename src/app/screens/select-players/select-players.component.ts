import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SelectedPlayersService } from 'src/app/shared/services/selected-players.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss']
})
export class SelectPlayersComponent implements OnInit {

  players = [];

  selectedPlayers = [];

  newPlayer = "";

  constructor(
    private router: Router,
    private storageService: StorageService,
    private selectedPlayersService: SelectedPlayersService) { }

  ngOnInit() {
    this.players = this.storageService.getPlayers();
  }

  addPlayer() {
    this.players.push(this.newPlayer);
    this.newPlayer = "";
    this.storageService.storePlayers(this.players);
  }

  deletePlayer(i: number) {
    this.storageService.storePlayers(this.players.splice(i, 1));
  }

  validate() {
    this.selectedPlayersService.setPlayers(this.selectedPlayers);
    this.router.navigate(["play"]);
  }
}
