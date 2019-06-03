import { NgModule } from '@angular/core';

import {
  MatListModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule,
  MatBadgeModule,
  MatChipsModule
} from '@angular/material';


@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatBadgeModule,
    MatChipsModule
  ],
  exports: [
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatBadgeModule,
    MatChipsModule
  ],
  providers: [
  ]
})
export class MaterialModule { }
