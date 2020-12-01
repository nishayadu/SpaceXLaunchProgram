import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexService } from '../services/spacex.service';
import type { SpaceXDataFilters } from 'src/app/types';


@Component({
  selector: 'app-spacex-launch',
  templateUrl: './spacex-launch.component.html',
  styleUrls: ['./spacex-launch.component.scss']
})
export class SpacexLaunchComponent  {
  spacexlaunchData: any =[];
  filters?: SpaceXDataFilters; 
  errorMessage: string='';
  constructor(private spacexService:SpacexService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.loadData();
  }

  private loadData() {
    const {launch_year, launch_success, land_success} =  this.route.snapshot.queryParams;
    this.filters = {
      launch_year: launch_year !== undefined ? launch_year : undefined,
      launch_success: launch_success !== undefined ? Boolean(launch_success) : undefined,
      land_success: land_success !== undefined ? Boolean(land_success) : undefined,
    }
    this.loadSpaceXlaunchData();
  }

  // Loads spaceXdata when the page is loaded 
  private loadSpaceXlaunchData(){
    // subscribing to get the data from the API
    this.spacexService.getSpaceXLaunchData(this.filters).subscribe((data) =>{
      this.spacexlaunchData = data;
    },
    (error)=>{
        this.errorMessage = error;
    }
    )

    // to change the URl based on the filters
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams, this.filters);

    this.router.navigate([], { relativeTo: this.route, queryParams: urlParameters });
  }

  onFilterChange(filters: SpaceXDataFilters) {
    this.filters = filters;
    this.loadSpaceXlaunchData();
  }
}
