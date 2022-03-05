import { TestBed } from '@angular/core/testing';

import { ApihhtpService } from './apihhtp.service';

describe('ApihhtpService', () => {
  let service: ApihhtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApihhtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
