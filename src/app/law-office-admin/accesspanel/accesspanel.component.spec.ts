import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesspanelComponent } from './accesspanel.component';

describe('AccesspanelComponent', () => {
  let component: AccesspanelComponent;
  let fixture: ComponentFixture<AccesspanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccesspanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesspanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
