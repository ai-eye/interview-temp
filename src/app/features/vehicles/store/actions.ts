import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IVehicleList } from '../interfaces/vehicle-list.interface';

export const VehiclesActions = createActionGroup({
  source: 'Vehicles',
  events: {
    'Load Vehicles': emptyProps(),
    'Load Vehicles Success': props<{ vehicleList: IVehicleList }>(),
    'Load Vehicles Failure': props<{ error: unknown }>(),
  }
});
