import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientImportUploadComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-upload/admin-client-import-upload.component';

describe('AdminClientImportUploadComponent', () => {
  let component: AdminClientImportUploadComponent;
  let fixture: ComponentFixture<AdminClientImportUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientImportUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientImportUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
