import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }}
