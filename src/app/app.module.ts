import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { MatListModule, MatGridListModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatExpansionModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  imports: [MatListModule, BrowserAnimationsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatExpansionModule, MatGridListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
