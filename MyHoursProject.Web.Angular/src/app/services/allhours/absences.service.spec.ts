import { TestBed } from '@angular/core/testing';

import { AbsencesService } from './absences.service';

describe('AbsenceService', () => {
  let service: AbsencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
