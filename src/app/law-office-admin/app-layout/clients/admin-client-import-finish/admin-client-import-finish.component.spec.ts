import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientImportFinishComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-finish/admin-client-import-finish.component';

describe('AdminClientImportFinishComponent', () => {
  let component: AdminClientImportFinishComponent;
  let fixture: ComponentFixture<AdminClientImportFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientImportFinishComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientImportFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
