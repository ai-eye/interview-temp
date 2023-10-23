import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { VehiclesActions, selectVehicleList, selectLoadStatus, selectError } from "../../store";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VehicleListComponent implements OnInit {
  isLoaded$ = this.store.select(selectLoadStatus);
  error$ = this.store.select(selectError)
  vehicleList$ = this.store.select(selectVehicleList);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(VehiclesActions.loadVehicles());
  }
}
