import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargementService } from './rechargement-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RechargementService', () => {
  let service: RechargementService;
  let fixture: ComponentFixture<RechargementService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(RechargementService);
    
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
