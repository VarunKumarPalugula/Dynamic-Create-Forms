import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressHistoryPopupComponent } from './address-history-popup.component';

describe('AddressHistoryPopupComponent', () => {
  let component: AddressHistoryPopupComponent;
  let fixture: ComponentFixture<AddressHistoryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressHistoryPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
