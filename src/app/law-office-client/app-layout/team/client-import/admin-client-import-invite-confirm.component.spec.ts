import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientImportInviteConfirmComponent } from '@app/law-office-client/app-layout/team/client-import/admin-client-import-invite-confirm.component';

describe('AdminClientImportInviteConfirmComponent', () => {
  let component: AdminClientImportInviteConfirmComponent;
  let fixture: ComponentFixture<AdminClientImportInviteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientImportInviteConfirmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientImportInviteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
