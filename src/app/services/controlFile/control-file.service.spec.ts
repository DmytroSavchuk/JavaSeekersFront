import { TestBed } from '@angular/core/testing';

import { ControlFileService } from './control-file.service';

describe('ControlFileService', () => {
  let service: ControlFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
