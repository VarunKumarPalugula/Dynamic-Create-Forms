import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientInviteComponent } from './admin-client-invite.component';

describe('AdminClientInviteComponent', () => {
  let component: AdminClientInviteComponent;
  let fixture: ComponentFixture<AdminClientInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientInviteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
