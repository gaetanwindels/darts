import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ScoreHistory } from "./score.model";
import { ScoreService } from "src/app/shared/services/score.service";

@Component({
  selector: 'score-players-dialog',
  templateUrl: 'score-players.dialog.html',
})
export class ScorePlayersDialog {

  constructor(
    public dialogRef: MatDialogRef<ScorePlayersDialog>,
    private scoreSerice: ScoreService,
    @Inject(MAT_DIALOG_DATA) public data: ScoreHistory[]) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getRemaining(score: ScoreHistory) {
    return this.scoreSerice.getRemaining(score);
  }
}