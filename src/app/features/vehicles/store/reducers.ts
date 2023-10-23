import { createFeature, createReducer, on } from '@ngrx/store';
import { VehiclesActions } from './actions';
import { initialState } from './state';
import { loadType } from '@shared/types';

const vehiclesFeature = createFeature({
    name: 'vehicles',
    reducer: createReducer(
        initialState,
        on(VehiclesActions.loadVehicles, (state) => ({
            ...state,
            loadStatus: <loadType>'pending',
            error: null,
        })),
        on(VehiclesActions.loadVehiclesSuccess, (state, { vehicleList }) => ({
            ...state,
            loadStatus: <loadType>'success',
            error: '',
            vehicleList: vehicleList,
        })),
        on(VehiclesActions.loadVehiclesFailure, (state, { error }) => ({
            ...state,
            loadStatus: <loadType>'error',
            error,
        })),
    ),
});

export const {
    name: vehicleFeatureKey,
    reducer: vehiclesReducer,
    selectLoadStatus,
    selectVehicleList,
    selectError,
} = vehiclesFeature
