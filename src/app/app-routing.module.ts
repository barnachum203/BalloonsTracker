import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewComponent } from './components/view/view.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'view/:profileId', component: ViewComponent , canActivate: [AuthGuardService]},
  { path: 'edit/:profileId', component: EditComponent , canActivate: [AuthGuardService]},
  { path: 'create', component: CreatePetComponent , canActivate: [AuthGuardService]},
  {path: '**' ,component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
