import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBillingsComponent } from './client-billings.component';

describe('ClientBillingsComponent', () => {
  let component: ClientBillingsComponent;
  let fixture: ComponentFixture<ClientBillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientBillingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
