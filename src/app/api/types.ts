import {Observable} from "rxjs";

export type Launch = {
  startDate: string,
  name: string,
  location: string,
  padName: string,
  status: string,
}

export interface LaunchesList {
  items: Launch[],
  page: number,
  limit: number,
  total: number,
  locationFilters: number[],
}

export interface ILaunchesList {
  getLaunches$: (page: number, limit: number, locationFilters: number[]) => Observable<LaunchesList>,
}

export type Location = {
  id: number,
  name: string,
}

export interface ILocationsList {
  getLocations$: () => Observable<Location[]>,
}
