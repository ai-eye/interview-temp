import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import * as featureStore from './store';
import { SharedModule } from '@shared/shared.module';
import { VehiclesEffects } from './store';
import { DirectivesModule } from '@shared/directives/directives.module';

@NgModule({
  declarations: [
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule,
    DirectivesModule,
    StoreModule.forFeature(featureStore.vehicleFeatureKey, featureStore.vehiclesReducer),
    EffectsModule.forFeature([VehiclesEffects])
  ]
})
export class VehiclesModule { }
