import { TestBed } from '@angular/core/testing';

import { ClientpermissionService } from './clientpermission.service';

describe('ClientpermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientpermissionService = TestBed.get(ClientpermissionService);
    expect(service).toBeTruthy();
  });
});
