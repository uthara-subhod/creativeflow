import { TestBed } from '@angular/core/testing';

import { CreateGuardService } from './create-guard.service';

describe('CreateGuardService', () => {
  let service: CreateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
