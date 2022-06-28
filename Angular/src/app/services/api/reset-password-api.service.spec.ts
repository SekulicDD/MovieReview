import { TestBed } from '@angular/core/testing';

import { ResetPasswordApiService } from './reset-password-api.service';

describe('ResetPasswordApiService', () => {
  let service: ResetPasswordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
