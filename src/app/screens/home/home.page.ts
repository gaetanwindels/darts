import { Component } from '@angular/core';

import { ScoreHistory, Throw } from './score.model';
import { SelectedPlayersService } from 'src/app/shared/services/selected-players.service';
import { ScoreService } from 'src/app/shared/services/score.service';
import { ScorePlayersDialog } from './score-players.dialog';
import { MatDialog } from '@angular/material';

import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  title = 'darts';

  players: string[];

  scores: ScoreHistory[];

  currentScores: ScoreHistory;

  constructor(private selectedPlayersService: SelectedPlayersService,
    private scoreService: ScoreService,
    private storageService: StorageService,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    //let previousGame = this.storageService.getGameState();
    let previousGame = null;
    if (previousGame) {
      this.scores = previousGame.scores;
      this.currentScores = previousGame.currentScore;
    } else {
      // init players
      this.players = this.selectedPlayersService.getPlayers();
      this.scores = [];
      this.players.forEach(e => {
        this.scores.push({
          player: e,
          scores: []
        })
      });
    }
    this.currentScores = this.scores[0];
  }

  onPlay(event: Throw) {
    if (this.scoreService.isNextPlayer(this.currentScores) || this.scoreService.isOver(this.currentScores)) {
      return;
    }

    this.scoreService.addPoints(this.currentScores, event);
    if (this.scoreService.hasWon(this.currentScores)) {
      alert('Victoire de ' + this.currentScores.player);
    }

    this.storeGameState();
  }

  openDialog() {

    const dialogRef = this.dialog.open(ScorePlayersDialog, {
      panelClass: 'my-full-screen-dialog',
      data: { scores: this.scores }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  storeGameState() {
    this.storageService.storeGameState({
      currentScore: this.currentScores,
      scores: this.scores
    });
  }

  getCurrentScore() {
    return this.currentScores && [...this.currentScores.scores].pop() || {};
  }

  getNextPlayerName() {
    let index = this.scores.findIndex(score => score.player === this.currentScores.player);
    return this.scores[(index + 1) % this.scores.length].player;
  }

  getRemaining() {
    return this.scoreService.getRemaining(this.currentScores);
  }

  isNextPlayer() {
    return this.scoreService.isNextPlayer(this.currentScores) || this.scoreService.isOver(this.currentScores);
  }

  removeLastThrow() {
    this.scoreService.removeLastThrow(this.currentScores);
  }

  goToNextPlayer() {
    let index = this.scores.findIndex(score => score.player === this.currentScores.player);
    this.currentScores.scores.push({});
    this.currentScores = this.scores[(index + 1) % this.scores.length];
    this.storeGameState();
  }

}
