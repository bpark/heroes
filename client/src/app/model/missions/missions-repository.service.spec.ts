import { TestBed } from '@angular/core/testing';

import { MissionsRepositoryService } from './missions-repository.service';

describe('MissionsRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissionsRepositoryService = TestBed.get(MissionsRepositoryService);
    expect(service).toBeTruthy();
  });
});
