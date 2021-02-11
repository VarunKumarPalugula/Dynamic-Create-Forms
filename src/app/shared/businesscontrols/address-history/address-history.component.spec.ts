import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressHistoryComponent } from './address-history.component';

describe('AddressHistoryComponent', () => {
  let component: AddressHistoryComponent;
  let fixture: ComponentFixture<AddressHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressHistoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
