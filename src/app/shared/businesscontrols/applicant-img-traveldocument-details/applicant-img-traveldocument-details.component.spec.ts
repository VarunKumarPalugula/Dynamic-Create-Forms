import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantImgTraveldocumentDetailsComponent } from './applicant-img-traveldocument-details.component';

describe('ApplicantImgTraveldocumentDetailsComponent', () => {
  let component: ApplicantImgTraveldocumentDetailsComponent;
  let fixture: ComponentFixture<ApplicantImgTraveldocumentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantImgTraveldocumentDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantImgTraveldocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
