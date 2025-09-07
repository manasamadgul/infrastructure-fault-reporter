import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultForm } from './fault-form';

describe('FaultForm', () => {
  let component: FaultForm;
  let fixture: ComponentFixture<FaultForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaultForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaultForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
