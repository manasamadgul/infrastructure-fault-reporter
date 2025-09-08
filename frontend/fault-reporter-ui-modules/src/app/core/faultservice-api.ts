import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FaultReport {
  id?: string;
  faultType: number;
  description: string;
  latitude: number;
  longitude: number;
  reportedAt?: string;
  status?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FaultApiService {
  private apiUrl = 'http://localhost:5045/api/InfrastructureFaults';

  constructor(private http: HttpClient) { }

  createFault(fault: FaultReport): Observable<FaultReport> {
    return this.http.post<FaultReport>(this.apiUrl, fault);
  }

  getAllFaults(): Observable<FaultReport[]> {
    return this.http.get<FaultReport[]>(this.apiUrl);
  }

  getFaultById(id: string): Observable<FaultReport> {
    return this.http.get<FaultReport>(`${this.apiUrl}/${id}`);
  }
}
