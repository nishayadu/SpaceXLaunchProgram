import { HttpClient } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SpacexLaunchComponent } from './spacex-launch.component';
import { SpacexService } from '../services/spacex.service';
import { RouterTestingModule } from '@angular/router/testing';
import {  of } from 'rxjs';
import  {fixtureData}  from './fixture';
import { MissionCardComponent } from './mission-card/mission-card.component';
import { FilterComponent } from './filter/filter.component';
import { SpaceXDataFilters } from '../types';

fdescribe('SpacexLaunchComponent', () => {
  let component: SpacexLaunchComponent;
  let fixture: ComponentFixture<SpacexLaunchComponent>;
  let spacexServiceSpy : any;
  let spacexService: any;

  beforeEach(async () => {
    spacexServiceSpy = jasmine.createSpyObj<SpacexService>('SpacexService', ['getSpaceXLaunchData']);
    spacexServiceSpy.getSpaceXLaunchData.and.callFake(function(filter: SpaceXDataFilters){ 
      const {launch_year, launch_success, land_success} = filter;
      let filteredData = fixtureData;
      if(launch_success !== undefined){
        filteredData = filteredData.filter((item)=>{
            return item.launch_success === launch_success;
        })
      }
      if(land_success !== undefined){
        filteredData = filteredData.filter((item)=>{
            return item.rocket.first_stage.cores[0].land_success === land_success;
        })
      }
      if(launch_year){
        filteredData = filteredData.filter((item)=>{
            return item.launch_year === launch_year;
        })
      }

      return of(filteredData)
    });
    await TestBed.configureTestingModule({
      declarations: [ SpacexLaunchComponent, MissionCardComponent, FilterComponent ],
      providers: [{ provide: SpacexService, useValue: spacexServiceSpy }],
      imports:[RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacexLaunchComponent);
    component = fixture.componentInstance;
    spacexService = TestBed.inject(SpacexService);
    fixture.detectChanges();
  });

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Launch year Test Case
  it('should filter data based on launch year', fakeAsync(() => {
    fixture.detectChanges();
    const root = fixture.debugElement.nativeElement;
    
    let missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(100);

    // on click of a year it should give correct result
    root.querySelector('#launch_year_2006').click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(1);

    // on click of other year it should change the data 
    root.querySelector('#launch_year_2008').click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(2);

    // on clicking selected year again it should deselect the year
    root.querySelector('#launch_year_2008').click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(100);
  })); 

  it('should filter data based on launch success', fakeAsync(() => {
    fixture.detectChanges();
    const root = fixture.debugElement.nativeElement;
    let missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(100);

    // on clicking of launch success true
    root.querySelector("#launch_success_true").click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(95);

    // on clicking launch success false
    root.querySelector("#launch_success_false").click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(5);

    // on clicking the selected launch success false again deselect the value
    root.querySelector("#launch_success_false").click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(100);
  }));


  it('should filter data based on land success', fakeAsync(() => {
    fixture.detectChanges();
    const root = fixture.debugElement.nativeElement;
    let missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(100);

    // on clicking of land success true 
    root.querySelector("#land_success_true").click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(57);

    // on clicking of land success false
    root.querySelector("#land_success_false").click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(12);

    // on clicking of selected land success false again will deselect the value
    root.querySelector("#land_success_false").click();
    tick();
    fixture.detectChanges();
    missionCards = root.querySelectorAll('.mission-card');
    expect(missionCards.length).toEqual(100);
  }));
});
