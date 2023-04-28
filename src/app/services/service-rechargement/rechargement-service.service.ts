import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RechargementService {
constructor(private http: HttpClient) { }


DoPostRequest(endpoint: string,body:any,tokenHeader:string){

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenHeader}`
})
  return this.http.post(GlobalConstants.apiURL+endpoint,body,{headers:headers});
}





}
