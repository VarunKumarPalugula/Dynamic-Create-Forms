import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMultipleclientInviteComponent } from '@app/law-office-admin/app-layout/clients/admin-multipleclient-invite/admin-multipleclient-invite.component';

describe('AdminMultipleclientInviteComponent', () => {
  let component: AdminMultipleclientInviteComponent;
  let fixture: ComponentFixture<AdminMultipleclientInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMultipleclientInviteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMultipleclientInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
