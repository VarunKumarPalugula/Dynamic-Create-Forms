import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsFormComponent } from './financials-form.component';

describe('FinancialsFormComponent', () => {
  let component: FinancialsFormComponent;
  let fixture: ComponentFixture<FinancialsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
