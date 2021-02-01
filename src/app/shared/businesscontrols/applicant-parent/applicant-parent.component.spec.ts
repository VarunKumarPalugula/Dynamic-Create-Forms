import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantParentComponent } from './applicant-parent.component';

describe('ApplicantParentComponent', () => {
  let component: ApplicantParentComponent;
  let fixture: ComponentFixture<ApplicantParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
