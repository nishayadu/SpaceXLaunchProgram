import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit {
  @Input() missionData;
  constructor() { }

  ngOnInit(): void {
  }

  // To get land_success data, as it is having multiple values,so returning true if any one of the value is true
  // and if the value is null, showing it as unknown.
  getLandingData(landingData){
    const isUnknow = landingData.filter(item => item.land_success === null).length === landingData.length;
    if (isUnknow) return 'Unknown';
    return landingData.some(item => item.land_success === true);
   }
}
