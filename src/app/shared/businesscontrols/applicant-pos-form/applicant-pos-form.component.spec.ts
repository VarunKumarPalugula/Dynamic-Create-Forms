import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPosFormComponent } from './applicant-pos-form.component';

describe('ApplicantPosFormComponent', () => {
  let component: ApplicantPosFormComponent;
  let fixture: ComponentFixture<ApplicantPosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantPosFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantPosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
