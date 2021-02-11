import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployementSupportDocumentsComponent } from './employement-support-documents.component';

describe('EmployementSupportDocumentsComponent', () => {
  let component: EmployementSupportDocumentsComponent;
  let fixture: ComponentFixture<EmployementSupportDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployementSupportDocumentsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployementSupportDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
