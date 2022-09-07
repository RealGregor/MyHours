import { TestBed } from '@angular/core/testing';

import { AHAuthService } from './ah-auth.service';

describe('AHAuthService', () => {
  let service: AHAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AHAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
