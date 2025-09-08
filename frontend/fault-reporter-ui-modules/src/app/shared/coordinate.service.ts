import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Coordinates {
  latitude: number;
  longitude: number;
}
/**
* Service for sharing coordinate data between map and form components
* Uses RxJS BehaviorSubject to maintain and emit the latest coordinates
*/
@Injectable({
  providedIn: 'root' // Singleton service available throughout the app
})
export class CoordinateService {
  // Private subject to manage coordinate state internally
  private coordinatesSubject = new BehaviorSubject<Coordinates | null>(null);
  
  // Public observable for components to subscribe to coordinate updates
  coordinates$: Observable<Coordinates | null> = this.coordinatesSubject.asObservable();

  /**
   * Updates coordinates when user clicks on map
   * Notifies all subscribers of the change
   */
  updateCoordinates(latitude: number, longitude: number): void {
    this.coordinatesSubject.next({ latitude, longitude });
  }
}