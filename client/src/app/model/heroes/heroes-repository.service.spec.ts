import { TestBed } from '@angular/core/testing';

import { HeroesRepositoryService } from './heroes-repository.service';

describe('HeroesRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroesRepositoryService = TestBed.get(HeroesRepositoryService);
    expect(service).toBeTruthy();
  });
});
