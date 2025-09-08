import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time-ago-pipe';

@NgModule({
  declarations: [
    TimeAgoPipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
