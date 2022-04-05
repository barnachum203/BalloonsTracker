import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment'; // Angular CLI environment
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//INTERCEPTORS
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

//NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { loginReducer } from './components/login/store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/login/store/auth.effects';
import { mapReducer } from './components/menu/store/map.reducers';
import { MapEffects } from './components/menu/store/map.effects';
import { MapFacade } from './components/menu/store/map.facade';
import { AuthFacade } from './components/login/store/auth.facade';


//Materials
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
//Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Cesium
// import { AngularCesiumModule } from 'angular-cesium';
// import { AngularCesiumModule } from 'angular-cesium';
// import{ MapLayerProviderOptions } from 'angular-cesium';
import { CesiumDirective } from './components/map/cesium.directive';

//Modules
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { MenuModule } from './components/menu/menu.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//Services
import { LoaderService } from './services/shared/loader.service';

//Components
import { ShowErrorsComponent } from './components/shared/forms/show-errors/show-errors.component';
import { SnackBarComponent } from './components/login/snack-bar/snack-bar.component';
import { BallonDialogComponent } from './components/menu/ballon-dialog/ballon-dialog.component';
import { DynamicFormComponent } from './components/shared/forms/dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './components/shared/forms/dynamic-form-field/dynamic-form-field.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BallonDetailsComponent } from './components/menu/ballon-details/ballon-details.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

//Should be in seperate module.
const materials = [
  MatProgressSpinnerModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatDialogModule,
];

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
    DynamicFormFieldComponent,
    BallonDetailsComponent,
    ShowErrorsComponent,
    LoaderComponent,
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
    StoreModule.forRoot({ auth: loginReducer, map: mapReducer }, {}),
    EffectsModule.forRoot([AuthEffects, MapFacade, MapEffects, AuthFacade]),
    // AngularCesiumModule.forRoot({fixEntitiesShadows: false, customPipes: []}) ,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    FontAwesomeModule,
  ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
