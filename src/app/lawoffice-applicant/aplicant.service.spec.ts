import { TestBed } from '@angular/core/testing';

import { AplicantService } from '@app/lawoffice-applicant/aplicant.service';

describe('AplicantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplicantService = TestBed.get(AplicantService);
    expect(service).toBeTruthy();
  });
});
