import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { VehiclesActions } from './actions';
import { VehiclesEffects } from './effects';
import { VehiclesService } from '../services/vehicles.service';
import { IVehicleList } from '../interfaces/vehicle-list.interface';

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

describe('VehiclesEffects', () => {
    let actions$: Observable<any>;
    let effects: VehiclesEffects;
    let vehiclesService: jasmine.SpyObj<VehiclesService>;

    beforeEach(() => {
        const vehiclesServiceSpy = jasmine.createSpyObj('VehiclesService', ['getVehicles']);

        TestBed.configureTestingModule({
            providers: [
                VehiclesEffects,
                provideMockActions(() => actions$),
                { provide: VehiclesService, useValue: vehiclesServiceSpy },
            ],
        });

        effects = TestBed.inject(VehiclesEffects);
        vehiclesService = TestBed.inject(VehiclesService) as jasmine.SpyObj<VehiclesService>;
    });


    describe('loadVehiclesEffects$', () => {
        it('should return a loadVehiclesSuccess action, with the vehicleList, on success', () => {
            const vehicleList: IVehicleList = mockVehicleList;
            vehiclesService.getVehicles.and.returnValue(of(vehicleList));

            actions$ = of(VehiclesActions.loadVehicles());

            effects.loadVehiclesEffects$.subscribe((resultAction) => {
                expect(resultAction).toEqual(VehiclesActions.loadVehiclesSuccess({ vehicleList }));
            });
        });

        it('should return a loadVehiclesFailure action, with the error, on failure', () => {
            const error = new Error('An error occurred');
            vehiclesService.getVehicles.and.returnValue(new Observable((observer) => observer.error(error)));

            actions$ = of(VehiclesActions.loadVehicles());

            effects.loadVehiclesEffects$.subscribe((resultAction) => {
                expect(resultAction).toEqual(VehiclesActions.loadVehiclesFailure({ error }));
            });
        });
    });
});