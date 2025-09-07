import { Component, signal } from '@angular/core';
import { Logger } from './core/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fault-reporter-ui-modules');
  constructor(private logger: Logger) {
    this.logger.log('App started successfully!');
  }
}
