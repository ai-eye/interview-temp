import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicleList } from '../interfaces/vehicle-list.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  //todo: move to config
  serverPath = 'https://frontend-code-test-api-jhbwml7vva-nw.a.run.app/';
  vehiclesApiUrl = 'api/vehicles/';

  constructor(private httpClient: HttpClient) { }

  getVehicles(): Observable<IVehicleList> {
    return this.httpClient.get<IVehicleList>(this.serverPath + this.vehiclesApiUrl);
  }

}
