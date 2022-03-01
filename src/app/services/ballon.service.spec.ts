import { TestBed } from '@angular/core/testing';

import { BallonService } from './ballon.service';

describe('BallonService', () => {
  let service: BallonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
