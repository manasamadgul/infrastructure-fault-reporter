import { TestBed } from '@angular/core/testing';

import { FaultApiService } from './faultservice-api';

describe('FaultApiService', () => {
  let service: FaultApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaultApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
