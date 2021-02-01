import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantImmigrationDetailsCardComponent } from './applicant-immigration-details-card.component';

describe('ApplicantImmigrationDetailsCardComponent', () => {
  let component: ApplicantImmigrationDetailsCardComponent;
  let fixture: ComponentFixture<ApplicantImmigrationDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantImmigrationDetailsCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantImmigrationDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
