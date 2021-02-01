import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeammemberInvitationSignupComponent } from './admin-teammember-invitation-signup.component';

describe('AdminTeammemberInvitationSignupComponent', () => {
  let component: AdminTeammemberInvitationSignupComponent;
  let fixture: ComponentFixture<AdminTeammemberInvitationSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTeammemberInvitationSignupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeammemberInvitationSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
