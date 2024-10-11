import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';

import localEs from '@angular/common/locales/es-GT';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs, 'es')

@NgModule({
  declarations: [ AppComponent ],
  imports: [ 
    BrowserModule, 
    IonicModule.forRoot({mode: 'md'}), 
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
