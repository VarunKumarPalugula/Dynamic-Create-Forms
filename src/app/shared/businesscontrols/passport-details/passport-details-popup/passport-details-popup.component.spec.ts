import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportDetailsPopupComponent } from './passport-details-popup.component';

describe('PassportDetailsPopupComponent', () => {
  let component: PassportDetailsPopupComponent;
  let fixture: ComponentFixture<PassportDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
