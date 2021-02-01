import { TestBed } from '@angular/core/testing';

import { AdminpermissionService } from './adminpermission.service';

describe('AdminpermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminpermissionService = TestBed.get(AdminpermissionService);
    expect(service).toBeTruthy();
  });
});
