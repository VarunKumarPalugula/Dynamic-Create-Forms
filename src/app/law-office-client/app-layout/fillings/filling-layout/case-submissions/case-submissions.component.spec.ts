import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSubmissionsComponent } from './case-submissions.component';

describe('CaseSubmissionsComponent', () => {
  let component: CaseSubmissionsComponent;
  let fixture: ComponentFixture<CaseSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseSubmissionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
