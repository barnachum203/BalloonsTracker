import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { BallonDetailsComponent } from './components/menu/ballon-details/ballon-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent , children:[
    { path: '', component: MenuComponent },
    { path: ':id', component: BallonDetailsComponent },

  ]},

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
