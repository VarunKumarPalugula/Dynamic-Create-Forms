import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPermissionsComponent } from './client-permissions.component';

describe('ClientPermissionsComponent', () => {
  let component: ClientPermissionsComponent;
  let fixture: ComponentFixture<ClientPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPermissionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
