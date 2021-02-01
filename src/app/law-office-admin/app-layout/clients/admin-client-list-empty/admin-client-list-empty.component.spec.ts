import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientListEmptyComponent } from '@app/law-office-admin/app-layout/clients/admin-client-list-empty/admin-client-list-empty.component';

describe('AdminClientListEmptyComponent', () => {
  let component: AdminClientListEmptyComponent;
  let fixture: ComponentFixture<AdminClientListEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientListEmptyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
