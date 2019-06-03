import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'manage-players-dialog',
  templateUrl: 'manage-players.dialog.html',
})
export class ManagePlayersDialog {

  constructor(
    public dialogRef: MatDialogRef<ManagePlayersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}