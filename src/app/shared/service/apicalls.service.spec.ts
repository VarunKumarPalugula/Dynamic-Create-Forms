import { TestBed } from '@angular/core/testing';

import { ApicallsService } from '@app/shared/service/apicalls.service';

describe('ApicallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApicallsService = TestBed.get(ApicallsService);
    expect(service).toBeTruthy();
  });
});
