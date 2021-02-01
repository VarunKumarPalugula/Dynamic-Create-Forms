import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApplicantSponsorSigninComponent } from '@app/shared/Components/client-applicant-sponsor-signin/client-applicant-sponsor-signin.component';

describe('ClientApplicantSponsorSigninComponent', () => {
  let component: ClientApplicantSponsorSigninComponent;
  let fixture: ComponentFixture<ClientApplicantSponsorSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientApplicantSponsorSigninComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientApplicantSponsorSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
