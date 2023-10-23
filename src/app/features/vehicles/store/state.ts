import * as AppState from '../../../store/reducers';
import { loadType } from '@shared/types';
import { IVehicleList } from '../interfaces/vehicle-list.interface';

export interface State extends AppState.State {
    vehiclesFeature: IVehiclesState;
}

export interface IVehiclesState {
    loadStatus: loadType;
    error: unknown;
    vehicleList: IVehicleList;
}

export const initialState: IVehiclesState = {
    loadStatus: 'idle',
    error: null,
    vehicleList: []
};
