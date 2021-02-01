import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationNotificationComponent } from './confirmation-notification.component';

describe('ConfirmationNotificationComponent', () => {
  let component: ConfirmationNotificationComponent;
  let fixture: ComponentFixture<ConfirmationNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationNotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
