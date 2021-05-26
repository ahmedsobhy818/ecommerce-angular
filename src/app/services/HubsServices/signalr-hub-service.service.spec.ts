import { TestBed } from '@angular/core/testing';

import { SignalrHubServiceForUser } from './signalr-hub-service.service';

describe('SignalrHubServiceService', () => {
  let service: SignalrHubServiceForUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrHubServiceForUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
