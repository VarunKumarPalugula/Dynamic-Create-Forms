import { TestBed } from '@angular/core/testing';

import { HelperService } from '@app/shared/helpers/helper.service';

describe('HelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelperService = TestBed.get(HelperService);
    expect(service).toBeTruthy();
  });
});
