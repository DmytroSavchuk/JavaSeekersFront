import { TestBed } from '@angular/core/testing';

import { ArtifactTypeService } from './artifact-type.service';

describe('ArtifactTypeService', () => {
  let service: ArtifactTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtifactTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
