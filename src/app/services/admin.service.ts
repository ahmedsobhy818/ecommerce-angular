import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  GetAdmins(token){
    
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.get(environment.AppName + '/api/queries/GetAdmins.php'.replace('.php',environment.isDotNetCore?'':'.php') , { headers:headers})
  }
  AddNewAdmin(obj,token){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/NewAdmin.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
  }
  ChangeUserState(ID,Status,token){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    var obj= {ID,Status}
    return this.http.post(environment.AppName + '/api/queries/ChangeUserState.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
  }

  GetOperators(token){
    
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.get(environment.AppName + '/api/queries/GetOperators.php'.replace('.php',environment.isDotNetCore?'':'.php') , { headers:headers})
  }
  GetVendors(token){
    
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.get(environment.AppName + '/api/queries/GetVendors.php'.replace('.php',environment.isDotNetCore?'':'.php') , { headers:headers})
  }
  
}
