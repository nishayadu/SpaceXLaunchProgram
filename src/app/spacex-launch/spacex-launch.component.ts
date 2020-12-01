import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexService } from '../services/spacex.service';

@Component({
  selector: 'app-spacex-launch',
  templateUrl: './spacex-launch.component.html',
  styleUrls: ['./spacex-launch.component.scss']
})
export class SpacexLaunchComponent implements OnInit {
  yearArr = ["2006", "2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
  spacexlaunchData: any =[];
  launch_success : boolean= undefined;
  land_success:  boolean= undefined
  launch_year: string = '';
  toggleLaunch: string ='';
  errorMessage: string='';
  constructor(private spacexService:SpacexService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.loadSpaceXlaunchData();
  }

  ngOnInit(): void {
    this.loadSpaceXlaunchData();
  }

  // Loads spaceXdata when the page is loaded 
  private loadSpaceXlaunchData(){
    // subscribing to get the data from the API
    this.spacexService.getSpaceXLaunchData(this.launch_success, this.land_success, this.launch_year).subscribe((data) =>{
      this.spacexlaunchData = data;
    },
    (error)=>{
      console.log(error);
        this.errorMessage = error;
    }
    )

    // to change the URl based on the filters
    const urlParameters = Object.assign({}, this.route.snapshot.queryParams);
    urlParameters.launch_success = this.launch_success;
    urlParameters.land_success = this.land_success;
    urlParameters.launch_year = this.launch_year ? this.launch_year : undefined;
    this.router.navigate([], { relativeTo: this.route, queryParams: urlParameters });
  }

  // To get land_success data, as it is having multiple values,so returning true if any one of the value is true
  // and if the value is null, showing it as unknown.
  getLandingData(landingData){
   const isUnknow = landingData.filter(item => item.land_success === null).length === landingData.length;
   if (isUnknow) return 'Unknown';
   return landingData.some(item => item.land_success === true);
  }

  // filtering the data based on the Launch success value(true/false) 
  showLaunchSuccess(launchData){
    if(this.launch_success === undefined){
    this.launch_success = launchData;
    }
    else if((this.launch_success === true && launchData === false) ||
    (this.launch_success === false && launchData === true)){
      this.launch_success = launchData;
    }
    else if((this.launch_success === true && launchData === true) || 
    (this.launch_success === false && launchData === false)){
      this.launch_success = undefined;
    }
    this.loadSpaceXlaunchData();
  }

  // filtering the data based on the Land success value(true/false)
  showLandSuccess(landData){
    
    if(this.land_success === undefined){
      this.land_success = landData;
      }
      else if((this.land_success === true && landData === false) ||
      (this.land_success === false && landData === true)){
        this.land_success = landData;
      }
      else if((this.land_success === true && landData === true) || 
      (this.land_success === false && landData === false)){
        this.land_success = undefined;
      }
    this.loadSpaceXlaunchData();
  }

  // filtering the data based on Launch year
  showLaunchYear(launchYear){
    if(this.launch_year === '' || this.launch_year !== launchYear){
    this.launch_year = launchYear;
    }
    else if(this.launch_year === launchYear){
      this.launch_year = '';
    }
    this.loadSpaceXlaunchData();
  }


}
