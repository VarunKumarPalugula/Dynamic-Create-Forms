import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailAddressComponent } from '@app/shared/Components/verify-email-address/verify-email-address.component';

describe('VerifyEmailAddressComponent', () => {
  let component: VerifyEmailAddressComponent;
  let fixture: ComponentFixture<VerifyEmailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
