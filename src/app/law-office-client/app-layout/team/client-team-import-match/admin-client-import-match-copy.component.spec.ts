import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientImportMatchCopyComponent } from '@app/law-office-client/app-layout/team/client-team-import-match/admin-client-import-match-copy.component';

describe('AdminClientImportMatchCopyComponent', () => {
  let component: AdminClientImportMatchCopyComponent;
  let fixture: ComponentFixture<AdminClientImportMatchCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientImportMatchCopyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientImportMatchCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
