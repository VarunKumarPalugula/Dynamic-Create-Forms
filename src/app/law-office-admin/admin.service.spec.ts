import { TestBed } from '@angular/core/testing';

import { AdminService } from '@app/law-office-admin/admin.service';

describe('AdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});
