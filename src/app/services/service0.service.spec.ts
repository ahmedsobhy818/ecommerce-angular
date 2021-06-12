import { TestBed } from '@angular/core/testing';

import { Service0Service } from './service0.service';

describe('Service0Service', () => {
  let service: Service0Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
