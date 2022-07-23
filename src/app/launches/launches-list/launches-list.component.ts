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
  private limit: number = 10;

  constructor(
    private readonly _launchesListClient: LaunchesListClient,
  ) {
  }

  ngOnInit(): void {
    this.fetchData(13);
  }

  public pageChange(index: number) {
    this.fetchData(index);
  }

  private fetchData(pageIndex: number) {
    this._launchesListClient.getLaunches$(pageIndex, this.limit)
      .pipe(tap(response => this.data = response))
      .subscribe();
  }

}
