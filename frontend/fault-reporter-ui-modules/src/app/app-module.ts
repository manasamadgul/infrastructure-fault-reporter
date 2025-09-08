import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { CoreModule } from './core/core-module'; // Import CoreModule

import { App } from './app';
import { FaultFormComponent } from './fault-form/fault-form';
import { Map } from './map/map';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from './shared/time-ago-pipe';


@NgModule({
  declarations: [
    App,
    FaultFormComponent,
    Map
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    TimeAgoPipe
  ],
  bootstrap: [App]
})
export class AppModule { }
