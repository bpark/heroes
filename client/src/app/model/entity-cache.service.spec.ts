import {TestBed} from '@angular/core/testing';

import {EntityCacheService} from './entity-cache.service';

describe('EntityCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityCacheService = TestBed.get(EntityCacheService);
    expect(service).toBeTruthy();
  });
});
