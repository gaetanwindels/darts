import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'play', component: HomePage }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
