import { TestBed } from '@angular/core/testing';

import { BibliesSqliteService } from './biblies-sqlite.service';

describe('BibliesSqliteService', () => {
  let service: BibliesSqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliesSqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
