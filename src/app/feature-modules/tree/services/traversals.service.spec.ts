import { TestBed } from '@angular/core/testing';

import { TraversalsService } from './traversals.service';

describe('TraversalsService', () => {
  let service: TraversalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraversalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
