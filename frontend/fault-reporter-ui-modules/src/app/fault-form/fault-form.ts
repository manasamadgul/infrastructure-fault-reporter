import { Component,OnInit,OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoordinateService } from '../shared/coordinate.service';
import { FaultApiService, FaultReport } from '../core/faultservice-api';


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
  private coordinateSubscription!: Subscription;

  constructor(private fb: FormBuilder, 
  private coordinateService: CoordinateService,
  private faultApiService: FaultApiService) { }

  ngOnInit(): void {
    this.faultForm = this.fb.group({
      faultType: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.coordinateSubscription = this.coordinateService.coordinates$.subscribe(coords => {
      if (coords) {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
      }
    });

  }
onSubmit(): void {
    if (this.faultForm.valid && this.latitude && this.longitude) {
      const faultData:FaultReport  = {
        faultType: this.mapFaultTypeToEnum(this.faultForm.value.faultType),
        description: this.faultForm.value.description,
        latitude: this.latitude,
        longitude: this.longitude
      };
      console.log('Fault report:', faultData);
      // Send to backend API
      this.faultApiService.createFault(faultData).subscribe({
        next: (response) => {
          console.log('Fault created successfully:', response);
          this.faultForm.reset();
          this.latitude = null;
          this.longitude = null;
        },
        error: (error) => {
          console.error('Error creating fault:', error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.coordinateSubscription) {
      this.coordinateSubscription.unsubscribe();
    }
  }
  
  private mapFaultTypeToEnum(faultType: string): number {
  switch(faultType) {
    case 'CutCable': return 0;
    case 'DamagedPole': return 1;
    case 'TangledWire': return 2;
    default: return 3; // Other
  }
}

}
