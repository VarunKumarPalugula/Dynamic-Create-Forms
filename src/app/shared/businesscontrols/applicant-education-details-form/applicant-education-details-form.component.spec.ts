import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantEducationDetailsFormComponent } from './applicant-education-details-form.component';

describe('ApplicantEducationDetailsFormComponent', () => {
  let component: ApplicantEducationDetailsFormComponent;
  let fixture: ComponentFixture<ApplicantEducationDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantEducationDetailsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantEducationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
