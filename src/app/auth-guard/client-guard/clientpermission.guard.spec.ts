import { TestBed, async, inject } from '@angular/core/testing';

import { ClientpermissionGuard } from './clientpermission.guard';

describe('ClientpermissionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientpermissionGuard],
    });
  });

  it('should ...', inject([ClientpermissionGuard], (guard: ClientpermissionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
