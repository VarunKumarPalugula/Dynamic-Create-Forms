import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApplicantSponsorSignupComponent } from './client-applicant-sponsor-signup.component';

describe('ClientApplicantSponsorSignupComponent', () => {
  let component: ClientApplicantSponsorSignupComponent;
  let fixture: ComponentFixture<ClientApplicantSponsorSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientApplicantSponsorSignupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientApplicantSponsorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
