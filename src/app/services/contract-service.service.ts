import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  headers:any;
  token:any;
  constructor(private http:HttpClient) { }

  getContracts(){
    this.token=localStorage.getItem('Token')
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return  this.http.get(`${environment.api_url}/api/rest/admin/contractors`,{headers})
    
  }
  createContract(payload){
    const headers = new HttpHeaders().set('Authorization', `${this.token}`)
    .set('Content-Type', 'application/vnd.api+json');
   return this.http.post(`${environment.api_url}/api/rest/admin/contractors`,payload,{headers})
  }
  updateContract(payload,id){
    console.log("inside update");
    
    const headers = new HttpHeaders().set('Authorization', `${this.token}`)
    .set('Content-Type', 'application/vnd.api+json');
    return this.http.put(`${environment.api_url}/api/rest/admin/contractors/${id}`,payload,{headers})
  }
  deleteContract(id){
    const headers = new HttpHeaders().set('Authorization', `${this.token}`)
    return this.http.delete(`${environment.api_url}/api/rest/admin/contractors/${id}`,{headers})
  }
}
