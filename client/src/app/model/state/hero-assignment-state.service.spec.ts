import { TestBed } from '@angular/core/testing';

import { HeroAssignmentStateService } from './hero-assignment-state.service';

describe('HeroAssignmentStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroAssignmentStateService = TestBed.get(HeroAssignmentStateService);
    expect(service).toBeTruthy();
  });
});
