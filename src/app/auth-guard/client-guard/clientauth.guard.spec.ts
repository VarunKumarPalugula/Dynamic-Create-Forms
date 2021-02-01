import { TestBed, async, inject } from '@angular/core/testing';

import { ClientauthGuard } from '@app/auth-guard/client-guard/clientauth.guard';

describe('ClientauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientauthGuard],
    });
  });

  it('should ...', inject([ClientauthGuard], (guard: ClientauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
