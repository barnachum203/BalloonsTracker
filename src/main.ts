import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Cesium from 'cesium';
if (environment.production) {
  enableProdMode();
}

// window['CESIUM_BASE_URL'] = '/assets/cesium/';

// (window as any).CESIUM_BASE_URL = window.location.href
(window as any)['CESIUM_BASE_URL'] = '/assets/cesium/';
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YWM0YmJlZi1mZGQxLTQ5NDAtODNlYi00YzI1M2NhYzkzMjAiLCJpZCI6ODg0OTcsImlhdCI6MTY0OTI0MjY3NH0._jT9ZreMB4fcLXW7P1_oIp5Wqdc0fCY6s7GbtftzLS0';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
