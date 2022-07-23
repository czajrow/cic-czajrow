import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LaunchesList, Location} from "../../../api/types";
import {LocationsListClient} from "../../../api/api-clients";
import {tap} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() set data(value: LaunchesList) {
    this._filterValues = value.locationFilters;
  }

  @Output() filterChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  public _filterValues: number[] | null = null;
  public _filterAllValues: Location[] | null = null;

  constructor(
    private readonly _locationsListClient: LocationsListClient,
  ) { }

  ngOnInit(): void {
    this._locationsListClient.getLocations$()
      .pipe(tap((response) => this._filterAllValues = response))
      .subscribe();
  }

  public onFilterChange(data: Location[]) {
    this.filterChange.next(data.map(location => location.id));
  }

}
