import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientmasterpageComponent } from './clientmasterpage.component';

describe('ClientmasterpageComponent', () => {
  let component: ClientmasterpageComponent;
  let fixture: ComponentFixture<ClientmasterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientmasterpageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientmasterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
