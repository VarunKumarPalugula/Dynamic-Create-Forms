import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantEmployementComponent } from './applicant-employement.component';

describe('ApplicantEmployementComponent', () => {
  let component: ApplicantEmployementComponent;
  let fixture: ComponentFixture<ApplicantEmployementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantEmployementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantEmployementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
