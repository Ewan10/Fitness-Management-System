import { TestBed } from '@angular/core/testing';

import { TrainersService } from './trainers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrainersService', () => {
  let service: TrainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrainersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
