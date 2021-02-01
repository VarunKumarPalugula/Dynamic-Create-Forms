import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsCardComponent } from './financials-card.component';

describe('FinancialsCardComponent', () => {
  let component: FinancialsCardComponent;
  let fixture: ComponentFixture<FinancialsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialsCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
