import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProfileDetailsComponent } from './applicant-profile-details.component';

describe('ApplicantProfileDetailsComponent', () => {
  let component: ApplicantProfileDetailsComponent;
  let fixture: ComponentFixture<ApplicantProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantProfileDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
