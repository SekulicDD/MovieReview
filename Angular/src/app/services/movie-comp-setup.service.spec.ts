import { TestBed } from '@angular/core/testing';

import { MovieCompSetupService } from './movie-comp-setup.service';

describe('MovieCompSetupService', () => {
  let service: MovieCompSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCompSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
