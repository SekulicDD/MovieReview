import { TestBed } from '@angular/core/testing';

import { VisitorsApiService } from './visitors-api.service';

describe('VisitorsApiService', () => {
  let service: VisitorsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
