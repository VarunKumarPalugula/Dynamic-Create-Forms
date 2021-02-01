import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInviteConfirmComponent } from '@app/law-office-client/app-layout/team/team-invite-confirm/team-invite-confirm.component';

describe('TeamInviteConfirmComponent', () => {
  let component: TeamInviteConfirmComponent;
  let fixture: ComponentFixture<TeamInviteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamInviteConfirmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInviteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
