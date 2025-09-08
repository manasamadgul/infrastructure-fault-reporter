import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CoordinateService } from '../shared/coordinate.service';
import { FaultApiService, FaultReport } from '../core/faultservice-api';
import { TimeAgoPipe } from '../shared/time-ago-pipe';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.html',
  styleUrl: './map.css'
})

export class Map implements OnInit, AfterViewInit {
  private map!: L.Map;

  constructor(private coordinateService: CoordinateService, 
    private faultApiService: FaultApiService,
    private timeAgoPipe: TimeAgoPipe
) {
    //L.Icon.Default.mergeOptions({
    //iconRetinaUrl: 'assets/marker-icon-2x.png',
  //iconUrl: 'assets/marker-icon.png',
  //shadowUrl: 'assets/marker-shadow.png',
  //});
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadExistingFaults();
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795], // Center of USA
      zoom: 4
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (e) => {
      console.log('Map clicked at:', e.latlng);
      this.addMarker(e.latlng.lat, e.latlng.lng);
      this.coordinateService.updateCoordinates(e.latlng.lat, e.latlng.lng);
    });
  }

  private loadExistingFaults(): void {
    this.faultApiService.getAllFaults().subscribe({
      next: (faults) => {
        faults.forEach(fault => {
          this.addExistingFaultMarker(fault);
        });
      },
      error: (error) => {
        console.error('Error loading existing faults:', error);
      }
    });
  }

private addMarker(lat: number, lng: number): void {
  const marker = L.marker([lat, lng]).addTo(this.map);
  console.log('Pin dropped at:', lat, lng);
}

private addExistingFaultMarker(fault: FaultReport): void {
    const timeAgo = this.timeAgoPipe.transform(fault.reportedAt || '');
    console.log('TimeAgo input:', fault.reportedAt);
    console.log('TimeAgo output:', timeAgo);

    const marker = L.marker([fault.latitude, fault.longitude])
      .bindPopup(`<b>${this.getFaultTypeName(fault.faultType)}</b><br>${fault.description}<br>Reported ${timeAgo}</br>`)
      .addTo(this.map);
  }

  private getFaultTypeName(faultType: number): string {
    switch(faultType) {
      case 0: return 'Cut Cable';
      case 1: return 'Damaged Pole';
      case 2: return 'Tangled Wire';
      default: return 'Other';
    }
  }

}
