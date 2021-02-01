import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationPopup2Component } from './education-popup2.component';

describe('EducationPopup2Component', () => {
  let component: EducationPopup2Component;
  let fixture: ComponentFixture<EducationPopup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationPopup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationPopup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
