import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentHistoryPopupComponent } from './employment-history-popup.component';

describe('EmploymentHistoryPopupComponent', () => {
  let component: EmploymentHistoryPopupComponent;
  let fixture: ComponentFixture<EmploymentHistoryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentHistoryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
