import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesubmissionsComponent } from './casesubmissions.component';

describe('CasesubmissionsComponent', () => {
  let component: CasesubmissionsComponent;
  let fixture: ComponentFixture<CasesubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CasesubmissionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
