import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }
  
  uploadPhoto(obj,SpinnerVarName,token){  
    let headers = new HttpHeaders(); 
    //dont use large blue spinner 
    //, we will use our custom small spinner in this request 
    //our custom spinner is shown/hidden using component variable (SpinnerVarName)
    headers = headers.set('CustomSpinner',SpinnerVarName);
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/UploadProductPhoto.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), {reportProgress: true, observe: 'events', headers:headers})
  }
  newProduct(obj,token){  
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/NewProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
  }
  updateProduct(obj,token){
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    //obj["ID"]=ID 
    return this.http.post(environment.AppName + '/api/queries/UpdateProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
  }
  getProducts(token){  
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    return this.http.get(environment.AppName + '/api/queries/GetProducts.php'.replace('.php',environment.isDotNetCore?'':'.php') ,  { headers:headers})
  }   
  doStartStop(obj,token){
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/StartStopProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj), { headers:headers})
  }
  doSaveStock(stockItems,token){
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    return this.http.post(environment.AppName + '/api/queries/SaveStock.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?stockItems:JSON.stringify(stockItems), { headers:headers})
  }
  getActiveStocksForVendor(token){
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    return this.http.get(environment.AppName + '/api/queries/GetActiveStocksForVendor.php'.replace('.php',environment.isDotNetCore?'':'.php') ,  { headers:headers})
  }
  getPendingStocksForVendor(token){
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    return this.http.get(environment.AppName + '/api/queries/GetPendingStocksForVendor.php'.replace('.php',environment.isDotNetCore?'':'.php') ,  { headers:headers})
  }
}
