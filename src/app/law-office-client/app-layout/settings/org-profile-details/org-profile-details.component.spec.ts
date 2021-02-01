import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgProfileDetailsComponent } from './org-profile-details.component';

describe('OrgProfileDetailsComponent', () => {
  let component: OrgProfileDetailsComponent;
  let fixture: ComponentFixture<OrgProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgProfileDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
