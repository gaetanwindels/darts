import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/shared/services/storage.service';
import { MatDialog } from '@angular/material';
import { ManagePlayersDialog } from './manage-players.dialog';
import { addPlayer } from '@angular/core/src/render3/players';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: []
})
export class ManagePlayersComponent implements OnInit {

  players = [];

  newPlayer = "";

  constructor(private storageService: StorageService, public dialog: MatDialog) { }

  ngOnInit() {
    this.players = this.storageService.getPlayers();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ManagePlayersDialog, {
      position: { top: '100px' },
      width: '250px',
      data: { newPlayer: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newPlayer = result;
        this.addPlayer();
      }
    });
  }

  addPlayer() {
    this.players.unshift(this.newPlayer);
    this.newPlayer = "";
    this.storageService.storePlayers(this.players);
  }

  deletePlayer(i: number) {
    this.players.splice(i, 1)
    this.storageService.storePlayers(this.players);
  }

}
