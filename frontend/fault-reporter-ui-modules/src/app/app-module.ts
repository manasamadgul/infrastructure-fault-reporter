import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { CoreModule } from './core/core-module'; // Import CoreModule

import { App } from './app';
import { FaultForm } from './fault-form/fault-form';
import { Map } from './map/map';

@NgModule({
  declarations: [
    App,
    FaultForm,
    Map
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
