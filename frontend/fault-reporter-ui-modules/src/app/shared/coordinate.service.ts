import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoordinateService {
  private coordinatesSubject = new BehaviorSubject<Coordinates | null>(null);
  
  coordinates$: Observable<Coordinates | null> = this.coordinatesSubject.asObservable();

  updateCoordinates(latitude: number, longitude: number): void {
    this.coordinatesSubject.next({ latitude, longitude });
  }

  getCurrentCoordinates(): Coordinates | null {
    return this.coordinatesSubject.value;
  }
}