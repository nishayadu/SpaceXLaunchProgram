import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  constructor(private __http: HttpClient) { }

  // to fetch data from API based on the filter value
  public getSpaceXLaunchData(launch_success, land_success, launch_year) : Observable<any>{
    let params = new HttpParams();
    if(launch_success !== undefined){
      params = params.append("launch_success", launch_success );
    }
    if(land_success !== undefined){
      params = params.append("land_success", land_success );
    }
    if(launch_year){
      params = params.append("launch_year", launch_year );
    }
    // mocking spacexdata API
    return this.__http.get('https://api.spacexdata.com/v3/launches?limit=100' , {params: params}).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError)
    )
  }

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
  //window.alert(errorMessage);
  return throwError(errorMessage);
 }
}
