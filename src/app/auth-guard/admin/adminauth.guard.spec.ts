import { TestBed, async, inject } from '@angular/core/testing';

import { AdminauthGuard } from '@app/auth-guard/admin/adminauth.guard';

describe('AdminauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminauthGuard],
    });
  });

  it('should ...', inject([AdminauthGuard], (guard: AdminauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
