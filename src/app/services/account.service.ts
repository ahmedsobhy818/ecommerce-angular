import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  doSignUp(obj,SpinnerVarName) {
    let headers = new HttpHeaders(); 
     //dont use large blue spinner 
     //, we will use our custom small spinner in this request 
     //our custom spinner is shown/hidden using component variable (SpinnerVarName)
     headers = headers.set('CustomSpinner',SpinnerVarName);

    return this.http.post(environment.AppName + '/api/queries/signup.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers:headers})        
  
  }
   doLogin(obj,SpinnerVarName) {
    let headers = new HttpHeaders(); 
     //dont use large blue spinner 
     //, we will use our custom small spinner in this request 
     //our custom spinner is shown/hidden using component variable (SpinnerVarName)
     headers = headers.set('CustomSpinner',SpinnerVarName);

    return this.http.post(environment.AppName + '/api/queries/login.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers:headers})        
    
  }
  checkEmailExist(obj,SpinnerVarName){
    let headers = new HttpHeaders(); 
 //dont use large blue spinner 
 //, we will use our custom small spinner in this request 
 //our custom spinner is shown/hidden using component variable (SpinnerVarName)
 headers = headers.set('CustomSpinner',SpinnerVarName);
 
    return this.http.post(environment.AppName + '/api/queries/check-username.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers:headers})        
  }
  getNewNotificationsCount(obj){
    if(obj.ID == undefined)
     return of(0);

     let headers = new HttpHeaders();
     headers = headers.set('Authorization', obj.token);
   
    console.log(obj)
    return this.http.post(environment.AppName + '/api/queries/NewNotificationsCount.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers: headers})        
  }
  getNotifications(obj){
    // 
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', obj.token);
  
    return this.http.post(environment.AppName + '/api/queries/GetNotifications.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers: headers})        
  }
  SeeThisNotification(obj){
    return this.http.post(environment.AppName + '/api/queries/SeeANotifications.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
  }
  uploadPhoto(obj,SpinnerVarName){  
    let headers = new HttpHeaders(); 
    //dont use large blue spinner 
    //, we will use our custom small spinner in this request 
    //our custom spinner is shown/hidden using component variable (SpinnerVarName)
    headers = headers.set('CustomSpinner',SpinnerVarName);
    return this.http.post(environment.AppName + '/api/queries/UploadProfilePhoto.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), {reportProgress: true, observe: 'events', headers:headers})
  }
  EditProfile(obj,SpinnerVarName){
    let headers = new HttpHeaders(); 
    //dont use large blue spinner 
    //, we will use our custom small spinner in this request 
    //our custom spinner is shown/hidden using component variable (SpinnerVarName)
    headers = headers.set('CustomSpinner',SpinnerVarName);
    headers = headers.set('Authorization', obj.token);
    
    return this.http.post(environment.AppName + '/api/queries/EditProfile.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
   
                                                 
  }

  ChangePassword(obj,SpinnerVarName){
    let headers = new HttpHeaders(); 
    //dont use large blue spinner 
    //, we will use our custom small spinner in this request 
    //our custom spinner is shown/hidden using component variable (SpinnerVarName)
    headers = headers.set('CustomSpinner',SpinnerVarName);
    headers = headers.set('Authorization', obj.token);
    
    return this.http.post(environment.AppName + '/api/queries/ChangePassword.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
   
                                                 
  }
  GetMyLog(token){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return this.http.get(environment.AppName + '/api/queries/MyLog.php'.replace('.php',environment.isDotNetCore?'':'.php') ,  { headers:headers})
  }
}
