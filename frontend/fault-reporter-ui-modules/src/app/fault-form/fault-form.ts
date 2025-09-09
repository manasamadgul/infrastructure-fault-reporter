import { Component,OnInit,OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoordinateService } from '../shared/coordinate.service';
import { FaultApiService, FaultReport } from '../core/faultservice-api';
import { Logger } from '../core/logger';

/**
 * FaultFormComponent - Handles fault report form submission
 * Acts as a subscriber to coordinate updates from the map component
 * Manages reactive form validation and API communication
 */
@Component({
  selector: 'app-fault-form',
  standalone: false,
  templateUrl: './fault-form.html',
  styleUrl: './fault-form.css'
})
export class FaultFormComponent implements OnInit,OnDestroy  {
  faultForm!: FormGroup;
  latitude: number | null = null;
  longitude: number | null = null;
  // Subscription to coordinate service
  private coordinateSubscription!: Subscription;

  /**
   * Constructor - Injects required services
   * @param fb - FormBuilder for reactive form creation
   * @param coordinateService - Shared service for receiving map coordinates
   * @param faultApiService - Service for backend API communication
   */
  constructor(private fb: FormBuilder, 
  private coordinateService: CoordinateService,
  private faultApiService: FaultApiService,
  private logger:Logger) { }

  /**
  ** Initialize form and subscribe to coordinate updates
  */
  ngOnInit(): void {
    // Create reactive form with required field validation
    this.faultForm = this.fb.group({
      faultType: ['', Validators.required],
      description: ['']
    });
    // Subscribe to coordinate changes from map component
    this.coordinateSubscription = this.coordinateService.coordinates$.subscribe(coords => {
      if (coords) {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
      }
    });

  }
  /**
   * Form submission handler
   * Validates form and coordinates, then sends data to backend API
   */
onSubmit(): void {
      // Ensure form is valid and coordinates are selected
    if (this.faultForm.valid && this.latitude && this.longitude) {
     // Prepare fault data with enum conversion
      const faultData:FaultReport  = {
        faultType: this.mapFaultTypeToEnum(this.faultForm.value.faultType),
        description: this.faultForm.value.description,
        latitude: this.latitude,
        longitude: this.longitude
      };
      this.logger.log('Submitting fault report: ' + JSON.stringify(faultData));
      // Submit to backend API with success/error handling
      this.faultApiService.createFault(faultData).subscribe({
        next: (response) => {
          this.logger.log('Fault created successfully: ' + response);
          // Reset form and coordinates after successful submission
          this.faultForm.reset();
          this.latitude = null;
          this.longitude = null;
          this.coordinateService.refreshMap()
        },
        error: (error) => {
          this.logger.log('Error creating fault: ' + JSON.stringify(error));
          alert('Error submitting fault report. Please try again.');
        }
      });
    }
  }

  /**
   * Component cleanup - prevents memory leaks
   * Unsubscribes from coordinate service when component is destroyed
   */
  ngOnDestroy(): void {
    if (this.coordinateSubscription) {
      this.coordinateSubscription.unsubscribe();
    }
  }

  /**
   * Maps string fault types to backend enum values
   * @param faultType - String value from form dropdown
   * @returns Numeric enum value expected by backend
   */
  private mapFaultTypeToEnum(faultType: string): number {
  switch(faultType) {
    case 'CutCable': return 0;
    case 'DamagedPole': return 1;
    case 'TangledWire': return 2;
    default: return 3; // Other
  }
}

}
