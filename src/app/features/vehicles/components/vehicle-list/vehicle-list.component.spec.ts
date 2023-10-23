import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { VehicleListComponent } from './vehicle-list.component';
import { selectError, selectLoadStatus, selectVehicleList } from '../../store';
import { VehiclesActions } from '../../store';
import { By } from '@angular/platform-browser';
import { IVehicleList } from '../../interfaces/vehicle-list.interface';
import { loadType } from '@shared/types';
import { ChangeDetectionStrategy } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from '@shared/directives/directives.module';

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
  }];

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleListComponent],
      imports: [SharedModule, DirectivesModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectLoadStatus, value: <loadType>'idle' },
            { selector: selectError, value: null },
            { selector: selectVehicleList, value: [] }
          ]
        })
      ]
    }).overrideComponent(VehicleListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should dispatch loadVehicles action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(VehiclesActions.loadVehicles());
  });
  
  // todo: add the template
  xit('should display error message if error$ is not null', () => {
    store.overrideSelector(selectError, 'Error message');
    store.refreshState();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMessage.textContent).toContain('Error message');
  });
  
  it('should display vehicle with name "JAGUAR XE" if vehicleList$ is not empty', fakeAsync(() => {
    store.overrideSelector(selectVehicleList, mockVehicleList);
    store.refreshState();
    fixture.detectChanges();
    const vehicle = fixture.debugElement.query(By.css(`#vehicle-name-xe`)).nativeElement;    
    expect(vehicle.textContent).toContain('JAGUAR XE');
  }));
  
  it('should not display vehicle list if vehicleList$ is empty', () => {
    store.overrideSelector(selectVehicleList, []);
    store.refreshState();
    fixture.detectChanges();
    const vehicleList = fixture.debugElement.query(By.css('.vehicle__card'));
    expect(vehicleList).toBeFalsy();
  });
});