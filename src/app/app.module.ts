import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//NGRX
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HeaderInterceptor } from './interceptors/header.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { loginReducer } from './components/login/store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/login/store/auth.effects';


// import { AngularCesiumModule } from 'angular-cesium';
import{ MapLayerProviderOptions } from 'angular-cesium';
import { CesiumDirective } from './components/map/cesium.directive';
import { SnackBarComponent } from './components/login/snack-bar/snack-bar.component'

//Should be in seperate module.
const materials = [MatProgressSpinnerModule, MatProgressSpinnerModule,MatSidenavModule,MatSnackBarModule];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    MenuComponent,
    MapComponent,
    CesiumDirective,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    materials,
    StoreModule.forRoot({'auth': loginReducer}, {}),
    EffectsModule.forRoot([AuthEffects]),
    // AngularCesiumModule.forRoot({fixEntitiesShadows: false, customPipes: []}) ,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
