import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmessagesComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/messages/viewmessages/viewmessages.component';

describe('ViewmessagesComponent', () => {
  let component: ViewmessagesComponent;
  let fixture: ComponentFixture<ViewmessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewmessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
