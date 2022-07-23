import {Component, Input} from '@angular/core';
import {Launch} from "../../../api/types";

@Component({
  selector: 'app-launches-table',
  templateUrl: './launches-table.component.html',
  styleUrls: ['./launches-table.component.scss']
})
export class LaunchesTableComponent {

  @Input() launches: Launch[] = [];
}
