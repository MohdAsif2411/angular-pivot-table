import { TestBed } from '@angular/core/testing';

import { AngularPivottableService } from './angular-pivottable.service';

describe('AngularPivottableService', () => {
  let service: AngularPivottableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularPivottableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
