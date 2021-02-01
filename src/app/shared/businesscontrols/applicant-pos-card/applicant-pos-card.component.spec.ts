import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPosCardComponent } from './applicant-pos-card.component';

describe('ApplicantPosCardComponent', () => {
  let component: ApplicantPosCardComponent;
  let fixture: ComponentFixture<ApplicantPosCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantPosCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantPosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
