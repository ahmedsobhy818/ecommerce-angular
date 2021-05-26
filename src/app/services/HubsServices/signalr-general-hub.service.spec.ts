import { TestBed } from '@angular/core/testing';

import { SignalrGeneralHubService } from './signalr-general-hub.service';

describe('SignalrGeneralHubService', () => {
  let service: SignalrGeneralHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrGeneralHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
