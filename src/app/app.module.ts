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
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

import { HeaderInterceptor } from './interceptors/header.interceptor';
import { loginReducer } from './components/login/store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/login/store/auth.effects';

// import { AngularCesiumModule } from 'angular-cesium';

// import { AngularCesiumModule } from 'angular-cesium';
// import{ MapLayerProviderOptions } from 'angular-cesium';
import { CesiumDirective } from './components/map/cesium.directive';
import { SnackBarComponent } from './components/login/snack-bar/snack-bar.component';
import { BallonDialogComponent } from './components/menu/ballon-dialog/ballon-dialog.component';
import { DynamicFormComponent } from './components/shared/forms/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/shared/forms/dynamic-form-question/dynamic-form-question.component';
import { BallonDetailsComponent } from './components/menu/ballon-details/ballon-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { mapReducer } from './components/menu/store/map.reducers';
import { MapEffects } from './components/menu/store/map.effects';
import { ShowErrorsComponent } from './components/shared/forms/show-errors/show-errors.component';

import { LoginModule } from "./components/login/login.module";
import { HomeModule } from './components/home/home.module';
import { MenuModule } from './components/menu/menu.module';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
//Should be in seperate module.
const materials = [MatProgressSpinnerModule, MatProgressSpinnerModule,MatSidenavModule,MatSnackBarModule,MatDialogModule];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MenuComponent,
    MapComponent,
    CesiumDirective,
    SnackBarComponent,
    BallonDialogComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    BallonDetailsComponent,
    ShowErrorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    LoginModule,
    // HomeModule,
    // MenuModule,
    materials,
    StoreModule.forRoot({'auth': loginReducer, 'map': mapReducer}, {}),
    EffectsModule.forRoot([AuthEffects , MapEffects]),
    // AngularCesiumModule.forRoot({fixEntitiesShadows: false, customPipes: []}) ,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    FontAwesomeModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
