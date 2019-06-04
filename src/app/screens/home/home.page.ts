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

  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  colorGreen: string = "#22a063";
  colorRed: string = "#f63b1d";
  colorBlack: string = "#373d3d";
  colorWhite: string = "#f3f6e5";

  // Size conf
  outerWidth: number = 0.85;

  tripleWidth: number = 0.72;
  tripleDoubleSpaceWidth = 0.52;
  doubleWidth: number = 0.38;
  outerCenterWidth: number = 0.21;
  centerWidth: number = 0.1;

  // position
  positionX: number = 0.1;

  // font size
  fontSize: number;

  players: string[];

  scores: ScoreHistory[];

  currentScores: ScoreHistory;

  points = 0;

  dataSource = [{ "first": 12, "second": 12, "third": 12 }];
  displayedColumns: string[] = ['first', 'second', 'third', 'total'];

  constructor(private selectedPlayersService: SelectedPlayersService,
    private scoreService: ScoreService,
    private storageService: StorageService,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    // draw
    let previousGame = this.storageService.getGameState();
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
