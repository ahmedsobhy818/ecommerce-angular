import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http:HttpClient) { }

  getProducts(token){  
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    return this.http.get(environment.AppName + '/api/queries/GetAllPendingProducts.php'.replace('.php',environment.isDotNetCore?'':'.php') , {headers:headers})
  } 
  ApproveProduct(product,token,SpinnerVarName){
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    headers = headers.set('CustomSpinner',SpinnerVarName);

    return this.http.post(environment.AppName + '/api/queries/ApproveProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') ,{ID:product.ID}, {headers:headers})
  }
  SuspendProduct(product,token,SpinnerVarName){
    let headers = new HttpHeaders();      
    headers = headers.set('Authorization', token);
    headers = headers.set('CustomSpinner',SpinnerVarName);

    return this.http.post(environment.AppName + '/api/queries/SuspendProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') ,{ID:product.ID}, {headers:headers})
  }
}
