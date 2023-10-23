import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { IVehicleList } from '../interfaces/vehicle-list.interface';
import { VehiclesService } from './vehicles.service';
import { IVehicle } from '../interfaces/vehicle.interface';

const mockVehicleList: IVehicleList = [
  {
    "id": "xe",
    "name": "JAGUAR XE",
    "modelYear": "k17",
    "apiUrl": "/api/vehicles/xe",
    "media": [
      {
        "name": "vehicle",
        "url": "/images/16x9/xe_k17.jpg"
      },
      {
        "name": "vehicle",
        "url": "/images/1x1/xe_k17.jpg"
      }
    ]
  },
  {
    "id": "xf",
    "name": "JAGUAR XF",
    "modelYear": "k17",
    "apiUrl": "/api/vehicles/xf",
    "media": [
      {
        "name": "vehicle",
        "url": "/images/16x9/xf_k17.jpg"
      },
      {
        "name": "vehicle",
        "url": "/images/1x1/xf_k17.jpg"
      }
    ]
  },
  {
    "id": "problematic",
    "name": "Problematic",
    "modelYear": "k17",
    "apiUrl": "/api/vehicles/problematic",
    "media": [
      {
        "name": "vehicle",
        "url": "/images/16x9/problematic_k17.jpg"
      },
      {
        "name": "vehicle",
        "url": "/images/1x1/problematic_k17.jpg"
      }
    ]
  }];

fdescribe('VehiclesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: VehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        VehiclesService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VehiclesService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getVehicles', () => {
    let expectedVehicles: IVehicleList;

    beforeEach(() => {
      service = TestBed.inject(VehiclesService);
      expectedVehicles = mockVehicleList;
    });

    it('should return expected vehicle list (HttpClient called once)', (done: DoneFn) => {

      service.getVehicles().subscribe({
        next: vehicles =>
          expect(vehicles)
            .toEqual(expectedVehicles, 'should return expected vehicles'),
        error: fail
      });

       // HeroService should have made one request to GET heroes from expected URL
       const req = httpTestingController.expectOne(service.serverPath + service.vehiclesApiUrl);
       expect(req.request.method).toEqual('GET');
 
       // Respond with the mock heroes
       req.flush(expectedVehicles);
    });
  });
});
