import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  payload:any={}
  constructor(private route:Router ,private http:HttpClient){}
  onClick(){
    
       this.payload = {
        auth: {
          username: this.username,
          password: this.password
        }
      };
      
      this.http.post(`${environment.api_url}/api/rest/admin/auth`,this.payload).subscribe((res)=>{
        console.log(res);
        localStorage.setItem('Token',res['jwt'])
        if(res['jwt']){

          this.route.navigate(['/admin/contracts'])
        }
        else if(!res['jwt']){
        }
        
      },(error)=>{
        alert("something went wrong! please try again with valid credentials")

      })
    

      
    

  }
}
