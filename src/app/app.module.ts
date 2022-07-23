import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaunchesComponent } from './launches/launches.component';
import { LaunchesListComponent } from './launches/launches-list/launches-list.component';
import {HttpClientModule} from "@angular/common/http";
import { LaunchesTableComponent } from './launches/launches-list/launches-table/launches-table.component';
import { PaginatorComponent } from './launches/launches-list/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchesComponent,
    LaunchesListComponent,
    LaunchesTableComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
