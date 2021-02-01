import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:max-line-length
import { ConnectionInviteComponent } from '@app/law-office-client/app-layout/connections/connections-invite/connections-invite.component';

describe('ConnectionInviteComponent', () => {
  let component: ConnectionInviteComponent;
  let fixture: ComponentFixture<ConnectionInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionInviteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
