import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  doSignUp(obj) {
    return this.http.post(environment.AppName + '/api/queries/signup.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
  
  }
   doLogin(obj) {
    return this.http.post(environment.AppName + '/api/queries/login.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
    
  }
  checkEmailExist(obj){
    console.log(obj)
    return this.http.post(environment.AppName + '/api/queries/check-username.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
  }
}
