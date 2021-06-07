import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getAllProducts() {
    return this.http.get(environment.AppName + '/api/queries/AllProducts.php'.replace('.php',environment.isDotNetCore?'':'.php') )        
}
 getAllCats() {
  return this.http.get(environment.AppName + '/api/queries/AllCats.php'.replace('.php',environment.isDotNetCore?'':'.php') )        
  
}
 getProducts(obj) {
  return this.http.post(environment.AppName + '/api/queries/Products.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj)/*,{headers: headers}*/)        
  
}
 getAProduct(obj) {
  return this.http.post(environment.AppName + '/api/queries/GetAProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        

}
 getCatID(obj) {
  //return this.http.post(environment.AppName + '/api/queries/getCatID.php'.replace('.php',environment.isDotNetCore?'':'.php') ,JSON.stringify(obj))        
  return this.http.post(environment.AppName + '/api/queries/getCatID.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
  
}
 getProductComments(obj) {
  return this.http.post(environment.AppName + '/api/queries/getProductComments.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
  
}
 getSettings() {
  return this.http.get(environment.AppName + '/api/queries/GetSettings.php'.replace('.php',environment.isDotNetCore?'':'.php') )        
  
}

addComment(obj) {
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', obj.token);
  
  return this.http.post(environment.AppName + '/api/queries/AddComment.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers: headers})        
  
}

 getQtyForProduct(obj) {
  return this.http.post(environment.AppName + '/api/queries/getQtyForProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj))        
  
}
 AddOrder(obj) {
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', obj.token);
  return this.http.post(environment.AppName + '/api/queries/AddOrder.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers: headers})        

}
 getOrders(obj) {
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', obj.token);

  return this.http.post(environment.AppName + '/api/queries/getOrders.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers: headers})          
}

doAutocompletePrdoducts(obj,SpinnerVarName) {
 let headers = new HttpHeaders();
 //dont use large blue spinner 
 //, we will use our custom small spinner in this request 
 //our custom spinner is shown/hidden using component variable (SpinnerVarName)
 headers = headers.set('CustomSpinner',SpinnerVarName);
 
  return this.http.post(environment.AppName + '/api/queries/Search.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj),{headers:headers})          
}
}
