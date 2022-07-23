import {Component, OnInit} from '@angular/core';
import {LaunchesListClient} from "../../api/api-clients";
import {LaunchesList} from "../../api/types";
import {tap} from "rxjs";

@Component({
  selector: 'app-launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.scss']
})
export class LaunchesListComponent implements OnInit {

  public data: LaunchesList | null = null;
  private _limit: number = 10;
  private _currentPage: number = 1;
  private _locationFilters: number[] = [];

  constructor(
    private readonly _launchesListClient: LaunchesListClient,
  ) {
  }

  ngOnInit(): void {
    this.fetchData(this._currentPage, this._locationFilters);
  }

  public pageChange(index: number) {
    this.fetchData(index, this._locationFilters);
  }

  public filterChange(value: number[]) {
    this.fetchData(1, value);
  }

  private fetchData(pageIndex: number, locationFilters: number[]) {
    this._currentPage = pageIndex;
    this._locationFilters = locationFilters;

    this._launchesListClient.getLaunches$(pageIndex, this._limit, locationFilters)
      .pipe(tap(response => this.data = response))
      .subscribe();
  }

}
