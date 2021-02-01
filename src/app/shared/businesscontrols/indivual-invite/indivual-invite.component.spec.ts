import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivualInviteComponent } from './indivual-invite.component';

describe('IndivualInviteComponent', () => {
  let component: IndivualInviteComponent;
  let fixture: ComponentFixture<IndivualInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndivualInviteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivualInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
