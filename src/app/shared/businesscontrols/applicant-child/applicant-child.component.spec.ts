import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantChildComponent } from './applicant-child.component';

describe('ApplicantChildComponent', () => {
  let component: ApplicantChildComponent;
  let fixture: ComponentFixture<ApplicantChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
