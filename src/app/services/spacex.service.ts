import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';


// as the SpaceXData is mostly static, we will cache the data for 10 mins for a given url
const  spaceXDataCache = {};

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  constructor(private __http: HttpClient) { }

  // to fetch data from API based on the filter value
  public getSpaceXLaunchData(launch_success, land_success, launch_year) : Observable<any>{
    // form query parameter based on filters
    const params = new URLSearchParams ();

    params.append("limit", "100");

    if(launch_success !== undefined){
      params.append("launch_success", launch_success );
    }
    if(land_success !== undefined){
      params.append("land_success", land_success );
    }
    if(launch_year){
      params.append("launch_year", launch_year );
    }

    const url = 'https://api.spacexdata.com/v3/launches?' + params.toString();

    // if data is available on cache and is not expired (older than 5 minute) return observable from cache
    const cachedData = spaceXDataCache[url];
    if (cachedData && cachedData.updateTime + 30000  <= Date.now()) {
      return cachedData.observable;
    }

    // if not cached the request url
    const observable = this.__http.get(url).pipe(
      shareReplay(1),
      catchError((error) => {
        delete spaceXDataCache[url];
        return this.handleError(error);
      })
    )

    // add the observable back to cache and return the observable
    spaceXDataCache[url] = {
      updateTime: Date.now(),
      observable: observable,
    }

    return observable;
  }

  // Method to hanle error case
  handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } 
  else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
 }
}
