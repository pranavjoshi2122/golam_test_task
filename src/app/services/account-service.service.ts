import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  token: string;

  constructor(private http:HttpClient) { }
  getAccounts(){
    this.token=localStorage.getItem('Token')
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
   return this.http.get(`${environment.api_url}/api/rest/admin/accounts`,{headers})
  }
  createAccount(payload){
    const headers = new HttpHeaders().set('Authorization', `${this.token}`)
    .set('Content-Type', 'application/vnd.api+json');
    return this.http.post(`${environment.api_url}/api/rest/admin/accounts`, payload,{headers});
  }
  updateAccount(payload,id){
    const headers = new HttpHeaders().set('Authorization', `${this.token}`)
    .set('Content-Type', 'application/vnd.api+json');
    return this.http.put(`${environment.api_url}/api/rest/admin/accounts/${id}`,payload,{headers})
  }

  deleteAccount(id){
    const headers = new HttpHeaders().set('Authorization', `${this.token}`)
    return this.http.delete(`${environment.api_url}/api/rest/admin/accounts/${id}`,{headers})
  }
}
