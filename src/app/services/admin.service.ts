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
  GetRoles(token){
    
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.get(environment.AppName + '/api/queries/GetRoles.php'.replace('.php',environment.isDotNetCore?'':'.php') , { headers:headers})
  }
  AddRole(token,name){
    console.log(name)
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.post(environment.AppName + '/api/queries/NewRole.php'.replace('.php',environment.isDotNetCore?'':'.php'),{name:name} , { headers:headers})
  }
  addUserToRole(token,userId,roleId){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.post(environment.AppName + '/api/queries/AddUserToRole.php'.replace('.php',environment.isDotNetCore?'':'.php'),{userId,roleId} , { headers:headers})
  }
  deleteRole(token,roleId){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.post(environment.AppName + '/api/queries/DeleteRole.php'.replace('.php',environment.isDotNetCore?'':'.php'),{roleId} , { headers:headers})
  }
  editRole(token,roleId,name){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.post(environment.AppName + '/api/queries/EditRole.php'.replace('.php',environment.isDotNetCore?'':'.php'),{roleId,name} , { headers:headers})
  }

  GetCatTree(token){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return  this.http.get(environment.AppName + '/api/queries/GetTree.php'.replace('.php',environment.isDotNetCore?'':'.php') , { headers:headers})
  }
  DeActivateCategory(Id,token){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    let obj={CatID:Id,State:"false"}
    return  this.http.post(environment.AppName + '/api/queries/ChangeStateOfCategory.php'.replace('.php',environment.isDotNetCore?'':'.php'),environment.isDotNetCore?obj:JSON.stringify(obj) , { headers:headers})    
  }
  ActivateCategory(Id,token){
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    let obj={CatID:Id,State:"true"}
    return  this.http.post(environment.AppName + '/api/queries/ChangeStateOfCategory.php'.replace('.php',environment.isDotNetCore?'':'.php'),environment.isDotNetCore?obj:JSON.stringify(obj) , { headers:headers})    
  }

  uploadPhoto(obj,SpinnerVarName,token){  
    let headers = new HttpHeaders(); 
    //dont use large blue spinner 
    //, we will use our custom small spinner in this request 
    //our custom spinner is shown/hidden using component variable (SpinnerVarName)
    headers = headers.set('CustomSpinner',SpinnerVarName);
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/UploadCategoryPhoto.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), {reportProgress: true, observe: 'events', headers:headers})
  }
  newCategory(obj,token){  
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/NewCategory.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
  }
  editCategory(obj,token){  
    let headers = new HttpHeaders(); 
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/EditCategory.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
  }
}
