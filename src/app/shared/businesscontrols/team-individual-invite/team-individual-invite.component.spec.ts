import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamIndividualInviteComponent } from './team-individual-invite.component';

describe('TeamIndividualInviteComponent', () => {
  let component: TeamIndividualInviteComponent;
  let fixture: ComponentFixture<TeamIndividualInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamIndividualInviteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamIndividualInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
