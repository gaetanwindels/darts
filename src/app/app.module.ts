import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './screens/menu/menu.component';
import { HomePage } from './screens/home/home.page';
import { ManagePlayersComponent } from './screens/manage-players/manage-players.component';
import { SelectPlayersComponent } from './screens/select-players/select-players.component';
import { DartboardComponent } from './shared/components/dartboard/dartboard.component';
import { ManagePlayersDialog } from './screens/manage-players/manage-players.dialog';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { ScorePlayersDialog } from './screens/home/score-players.dialog';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomePage,
    ManagePlayersComponent,
    SelectPlayersComponent,
    ManagePlayersDialog,
    ScorePlayersDialog,
    DartboardComponent
  ],
  entryComponents: [ManagePlayersDialog, ScorePlayersDialog],
  imports: [MaterialModule, BrowserAnimationsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  exports: [],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
