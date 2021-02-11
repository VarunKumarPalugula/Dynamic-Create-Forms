import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodOfStayPopupComponent } from './period-of-stay-popup.component';

describe('PeriodOfStayPopupComponent', () => {
  let component: PeriodOfStayPopupComponent;
  let fixture: ComponentFixture<PeriodOfStayPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodOfStayPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodOfStayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
