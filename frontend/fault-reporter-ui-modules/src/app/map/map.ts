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
  // Fix for Leaflet marker icons not loading properly in Angular
  // Delete the default icon URL getter and set custom URLs to unpkg CDN
  // This resolves the common 404 error for marker icons in Angular projects
  delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.prototype.options.iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
L.Icon.Default.prototype.options.iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
L.Icon.Default.prototype.options.shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

  }

  ngOnInit(): void {
    this.coordinateService.refreshMap$.subscribe((refresh: boolean) => {
      if (refresh) {
        this.loadExistingFaults();
      }
    });
  }

  ngAfterViewInit(): void {
    // Initialize map after view is rendered to ensure DOM element exists
    this.initMap();
    // Load existing fault reports from backend and display as markers
    this.loadExistingFaults();
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795], // Center of USA
      zoom: 4
    });
    // Add OpenStreetMap tile layer for map visualization
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
    // Handle map click events to allow users to drop pins and select coordinates
    this.map.on('click', (e) => {
      console.log('Map clicked at:', e.latlng);
      // Add visual marker at clicked location
      this.addMarker(e.latlng.lat, e.latlng.lng);
      // Update shared coordinate service to notify form component
      this.coordinateService.updateCoordinates(e.latlng.lat, e.latlng.lng);
    });
  }

  private loadExistingFaults(): void {
    // Fetch all existing fault reports from backend API
    this.faultApiService.getAllFaults().subscribe({
      next: (faults) => {
      // Add marker for each existing fault report
        faults.forEach(fault => {
          this.addExistingFaultMarker(fault);
        });
      },
      error: (error) => {
        console.error('Error loading existing faults:', error);
      }
    });
  }
// Add a marker to the map at specified latitude and longitude
private addMarker(lat: number, lng: number): void {
  const marker = L.marker([lat, lng]).addTo(this.map);
  console.log('Pin dropped at:', lat, lng);
}

private addExistingFaultMarker(fault: FaultReport): void {
    // Use TimeAgoPipe to convert reportedAt timestamp into relative time string
    const timeAgo = this.timeAgoPipe.transform(fault.reportedAt || '');
    //console.log('TimeAgo input:', fault.reportedAt);
    //console.log('TimeAgo output:', timeAgo);

    // Create marker with popup showing fault details
    const marker = L.marker([fault.latitude, fault.longitude])
      .bindPopup(`<b>${this.getFaultTypeName(fault.faultType)}</b><br>${fault.description}<br>Reported ${timeAgo}</br>`)
      .addTo(this.map);
  }

  private getFaultTypeName(faultType: number): string {
    // Map enum value to human-readable string
    switch(faultType) {
      case 0: return 'Cut Cable';
      case 1: return 'Damaged Pole';
      case 2: return 'Tangled Wire';
      default: return 'Other';
    }
  }

}
