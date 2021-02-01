import { TestBed } from '@angular/core/testing';

import { ClientauthService } from './clientauth.service';

describe('ClientauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientauthService = TestBed.get(ClientauthService);
    expect(service).toBeTruthy();
  });
});
