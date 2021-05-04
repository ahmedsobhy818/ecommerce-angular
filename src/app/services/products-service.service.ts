import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
  return this.http.post(environment.AppName + '/api/queries/Products.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
  
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
  return this.http.post(environment.AppName + '/api/queries/AddComment.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        
  
}

 getQtyForProduct(obj) {
  return this.http.post(environment.AppName + '/api/queries/getQtyForProduct.php'.replace('.php',environment.isDotNetCore?'':'.php') , environment.isDotNetCore?obj:JSON.stringify(obj))        
  
}
 AddOrder(obj) {
  return this.http.post(environment.AppName + '/api/queries/AddOrder.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))        

}
 getOrders(obj) {
  return this.http.post(environment.AppName + '/api/queries/getOrders.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))          
}

doAutocompletePrdoducts(obj) {
  return this.http.post(environment.AppName + '/api/queries/Search.php'.replace('.php',environment.isDotNetCore?'':'.php') ,environment.isDotNetCore?obj:JSON.stringify(obj))          
}
}
