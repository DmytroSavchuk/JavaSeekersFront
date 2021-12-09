import { TestBed } from '@angular/core/testing';

import { ArtifactErrorsCheckService } from './artifact-errors-check.service';

describe('ArtifactErrorsCheckService', () => {
  let service: ArtifactErrorsCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtifactErrorsCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
