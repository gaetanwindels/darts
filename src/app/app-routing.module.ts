import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './screens/menu/menu.component';
import { HomePage } from './screens/home/home.page';
import { ManagePlayersComponent } from './screens/manage-players/manage-players.component';
import { SelectPlayersComponent } from './screens/select-players/select-players.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'play', component: HomePage },
  { path: 'manage-players', component: ManagePlayersComponent },
  { path: 'select-players', component: SelectPlayersComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
