import { TestBed } from '@angular/core/testing';

import { ClientCommonServiceService } from './client-common-service.service';

describe('ClientCommonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientCommonServiceService = TestBed.get(ClientCommonServiceService);
    expect(service).toBeTruthy();
  });
});
