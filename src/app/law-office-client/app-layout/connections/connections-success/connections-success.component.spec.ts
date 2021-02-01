import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientInviteConfirmComponent } from '@app/law-office-admin/app-layout/clients/admin-client-invite-confirm/admin-client-invite-confirm.component';

describe('AdminClientInviteConfirmComponent', () => {
  let component: AdminClientInviteConfirmComponent;
  let fixture: ComponentFixture<AdminClientInviteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientInviteConfirmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientInviteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
