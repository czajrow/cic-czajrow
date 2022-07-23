import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LaunchesList} from "../../../api/types";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() set data(value: LaunchesList) {
    this._pagesCount = Math.ceil(value.total / value.limit);
    this._currentPage = value.page;

    this._buttonsToDisplay = [];

    const neighbours = 1;
    let needDots = true;

    for (let i = 1; i <= this._pagesCount; i++) {
      if (
        (i > 1 + neighbours && i < this._currentPage - neighbours) ||
        (i > this._currentPage + neighbours && i < this._pagesCount - neighbours)
      ) {
        if (needDots) this._buttonsToDisplay.push({});

        needDots = false;
        continue;
      }

      this._buttonsToDisplay.push({index: i});
      needDots = true;
    }
  };

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public _pagesCount: number = 0;
  public _currentPage: number = 0;
  public _buttonsToDisplay: {index?: number}[] = [];

  public onPageChangeClick(index: number) {
    this.pageChange.next(index);
  }
}
