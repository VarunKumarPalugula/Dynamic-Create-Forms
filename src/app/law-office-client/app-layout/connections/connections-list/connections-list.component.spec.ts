import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:max-line-length
import { ConnectionListComponent } from '@app/law-office-client/app-layout/connections/connections-list/connections-list.component';

describe('ConnectionListComponent', () => {
  let component: ConnectionListComponent;
  let fixture: ComponentFixture<ConnectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
