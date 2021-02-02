import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodOfStayComponent } from './period-of-stay.component';

describe('PeriodOfStayComponent', () => {
  let component: PeriodOfStayComponent;
  let fixture: ComponentFixture<PeriodOfStayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodOfStayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodOfStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
