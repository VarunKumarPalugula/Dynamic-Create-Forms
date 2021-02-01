import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaminvitesuccessComponent } from '@app/law-office-client/app-layout/team/teaminvitesuccess/teaminvitesuccess.component';

describe('TeaminvitesuccessComponent', () => {
  let component: TeaminvitesuccessComponent;
  let fixture: ComponentFixture<TeaminvitesuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeaminvitesuccessComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaminvitesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
