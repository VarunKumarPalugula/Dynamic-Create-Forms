import { TestBed } from '@angular/core/testing';

import { JsonSectionValidationService } from './json-section-validation.service';

describe('JsonSectionValidationService', () => {
  let service: JsonSectionValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonSectionValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
