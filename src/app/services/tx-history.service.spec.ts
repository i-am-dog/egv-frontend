import { TestBed } from '@angular/core/testing';

import { TxHistoryService } from './tx-history.service';

describe('TxHistoryService', () => {
  let service: TxHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TxHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
