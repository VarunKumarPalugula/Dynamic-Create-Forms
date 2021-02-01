import { TestBed } from '@angular/core/testing';

import { AutotimeoutService } from './autotimeout.service';

describe('AutotimeoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutotimeoutService = TestBed.get(AutotimeoutService);
    expect(service).toBeTruthy();
  });
});
