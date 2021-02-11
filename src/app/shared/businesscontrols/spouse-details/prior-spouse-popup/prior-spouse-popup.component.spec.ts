import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorSpousePopupComponent } from './prior-spouse-popup.component';

describe('PriorSpousePopupComponent', () => {
  let component: PriorSpousePopupComponent;
  let fixture: ComponentFixture<PriorSpousePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriorSpousePopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorSpousePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
