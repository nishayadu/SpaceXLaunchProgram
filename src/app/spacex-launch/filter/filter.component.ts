import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import type { SpaceXDataFilters } from 'src/app/types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  yearArr = ["2006", "2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
  @Input() filters;
  @Output() onFilterChange  = new EventEmitter<SpaceXDataFilters>();
  constructor() { }

  ngOnInit(): void {
  }
  
  // Emitting filterValues when data is filtered by launch success
  filterByLaunchSuccess(launch_success:boolean) {
    const {filters} = this;
    if (launch_success === filters.launch_success) {
      launch_success = undefined;
    }
    filters.launch_success = launch_success;

    this.onFilterChange.emit(filters);
  }

  // Emitting filterValues when data is filtered by land success
  filterByLandSuccess (land_success:boolean) {
    const {filters} = this;
    if (land_success === filters.land_success) {
      land_success = undefined;
    }
    filters.land_success = land_success;

    this.onFilterChange.emit(filters);
  }

  // Emitting filterValues when data is filtered by launch year
  filterByLaunchYear(launch_year:string) {
    const {filters} = this;
    if (launch_year === filters.launch_year) {
      launch_year = undefined;
    }
    filters.launch_year = launch_year;

    this.onFilterChange.emit(filters);
  }

}
