import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {PercipitateFilter} from "../../models/percipitate-filter";

/*
  Generated class for the FilterServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FilterServiceProvider {
  
  percipitateFilter: PercipitateFilter;
  constructor() {
  }

  getPercipitateFilter(): PercipitateFilter{
    return this.percipitateFilter;
  }

  setPercipitateFilter(givenFilter: PercipitateFilter){
    this.percipitateFilter = givenFilter;
  }

}
