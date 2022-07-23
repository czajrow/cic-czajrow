import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ILaunchesList, ILocationsList, Launch, LaunchesList, Location} from "./types";

const BASE_URL = 'https://space-api.gset.pl';

@Injectable({
  providedIn: 'root',
})
export class LaunchesListClient implements ILaunchesList {

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getLaunches$(page: number, limit: number, locationFilters: number[]): Observable<LaunchesList> {
    const url = BASE_URL + '/launches';
    const queryParams = new HttpParams().appendAll({_page: page, _limit: limit, 'pad.location.id': locationFilters});

    const options = {
      responseType: 'json' as 'json',
      params: queryParams,
      observe: 'response' as 'response',
    };

    type BodyType = {
      window_start: string,
      name: string,
      pad: {
        name: string,
        location: {
          name: string,
        }
      },
      status: {
        name: string,
      },
    };

    return this._http.get(url, options).pipe(
      map(response => {

        const items: Launch[] = (response.body as [] || []).map((item: BodyType) => ({
          startDate: item.window_start,
          name: item.name,
          location: item.pad.location.name,
          padName: item.pad.name,
          status: item.status.name,
        }));

        return {
          items,
          page,
          limit,
          total: +(response.headers.get('X-Total-Count') || 0),
          locationFilters,
        };
      }),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class LocationsListClient implements ILocationsList {

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getLocations$(): Observable<Location[]> {
    const url = BASE_URL + '/locations';
    const options = {
      responseType: 'json' as 'json',
    };

    return this._http.get<Location[]>(url, options).pipe(
      map(response => response.map(item => ({id: item.id, name: item.name})))
    );
  }
}
