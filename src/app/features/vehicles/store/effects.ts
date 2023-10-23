import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VehiclesService } from "../services/vehicles.service";
import { VehiclesActions } from './actions';
import { switchMap, map, catchError, of } from "rxjs";

@Injectable()
export class VehiclesEffects {
    constructor(private actions$: Actions, private vehiclesService: VehiclesService) { }

    loadVehiclesEffects$ = createEffect(() => this.actions$.pipe(
        ofType(VehiclesActions.loadVehicles),
        switchMap(() => 
            this.vehiclesService.getVehicles().pipe(
                map((vehicleList) => VehiclesActions.loadVehiclesSuccess({ vehicleList })),
                catchError((error) => of(VehiclesActions.loadVehiclesFailure({ error }))),
            )
        )
    ))
}
