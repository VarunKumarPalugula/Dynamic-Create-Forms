import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantEducationDetailsCardComponent } from './applicant-education-details-card.component';

describe('ApplicantEducationDetailsCardComponent', () => {
  let component: ApplicantEducationDetailsCardComponent;
  let fixture: ComponentFixture<ApplicantEducationDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantEducationDetailsCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantEducationDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
