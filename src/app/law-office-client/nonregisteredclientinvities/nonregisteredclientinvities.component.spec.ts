import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:max-line-length
import { NonregisteredclientinvitiesComponent } from '@app/law-office-client/nonregisteredclientinvities/nonregisteredclientinvities.component';

describe('NonregisteredclientinvitiesComponent', () => {
  let component: NonregisteredclientinvitiesComponent;
  let fixture: ComponentFixture<NonregisteredclientinvitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonregisteredclientinvitiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonregisteredclientinvitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
