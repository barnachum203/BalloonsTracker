import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BallonDetailsComponent } from '../menu/ballon-details/ballon-details.component';
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from './home.component';

const homeRoutes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: MenuComponent },
      { path: ':id', component: BallonDetailsComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
