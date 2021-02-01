import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantImmigrationDetailsFormComponent } from './applicant-immigration-details-form.component';

describe('ApplicantImmigrationDetailsFormComponent', () => {
  let component: ApplicantImmigrationDetailsFormComponent;
  let fixture: ComponentFixture<ApplicantImmigrationDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantImmigrationDetailsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantImmigrationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
