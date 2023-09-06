import { TestBed } from '@angular/core/testing';

import { CatDataSetService } from './cat-data-set.service';

describe('CatDataSetService', () => {
  let service: CatDataSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatDataSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
