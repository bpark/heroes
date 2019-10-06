import {TestBed} from '@angular/core/testing';

import {MissionNameGeneratorService} from './mission-name-generator.service';

describe('MissionNameGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissionNameGeneratorService = TestBed.get(MissionNameGeneratorService);
    expect(service).toBeTruthy();
  });
});
