import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Interface defining the structure of a fault report
 * Maps to the backend InfrastructureFault model
 */

export interface FaultReport {
  id?: string; // Optional, as it may be assigned by the backend
  faultType: number; // Enum value: 0=CutCable, 1=DamagedPole, 2=TangledWire
  description: string; // User-provided description
  latitude: number; // Geographic latitude
  longitude: number; // Geographic longitude
  reportedAt?: string; //ISO timestamp - set by backend
  status?: number; // Enum value: 0=Open, 1=InProgress, 2=Resolved
}
/**
 * Service for communicating with the fault reporting backend API
 * Backend API Base URL: http://localhost:5045/api/InfrastructureFaults
 */
@Injectable({
  providedIn: 'root' // Singleton service available app-wide
})
export class FaultApiService {
  private apiUrl = 'http://localhost:5045/api/InfrastructureFaults';

  constructor(private http: HttpClient) { }

  /**
   * Creates a new fault report
   * @param fault - Fault data from the form
   * @returns Observable of the created fault with generated ID
   */
  createFault(fault: FaultReport): Observable<FaultReport> {
    return this.http.post<FaultReport>(this.apiUrl, fault);
  }

  /**
   * Retrieves all existing fault reports
   * Used to populate map markers on application load
   * @returns Observable array of all faults
   */
  getAllFaults(): Observable<FaultReport[]> {
    return this.http.get<FaultReport[]>(this.apiUrl);
  }

  /**
   * Retrieves a specific fault by ID
   * @param id - Unique fault identifier
   * @returns Observable of the requested fault
   */
  getFaultById(id: string): Observable<FaultReport> {
    return this.http.get<FaultReport>(`${this.apiUrl}/${id}`);
  }
}
