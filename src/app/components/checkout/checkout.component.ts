import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from 'src/app/services/products-service.service';
import { RemoveAllAction, REMOVE_ALL } from 'src/app/Store/actions/cart.action';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { cartFS } from 'src/app/Store/reducers/cart.reducer';
import { loggedFS } from 'src/app/Store/reducers/logged.reducer';
import { settingsSelector } from 'src/app/Store/reducers/settings.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  dataSource
  settings
  //nQtyError=0
  ShowMsg=false;
  alert=""
  ErrorsList=[]
  ShowSignIn=false
  Logged=null;
  isLogged=false
  address=''
  phone=''
  TotalBasicPrice=0
  TotalTax=0
  TotalShipping=0
  Total=0
  msg=''

  displayedColumns: string[] = ['Index','Image','Name', 'Price','nItems','TotalPrice','Tax','Shipping','SubTotal']
  constructor(private store:Store<StoreInterface>,
    private router:Router,
    private service:ProductsService,
    private _snackBar: MatSnackBar) {
      store.select(cartFS).subscribe(data=>{
        let index=1
      this.dataSource= data.cartItems.map((element)=>{
        return{
        Index:index++,
         ID:element.product.ID,
        Name:element.product.Name,
        ArabicName:element.product.ArabicName ,
        nItems:element.nItems,
        Price:element.product.Price,
        error:''
        
        
        }
       })

      
    
      
      this.ErrorsList=[]
      this.dataSource.forEach(element => {
      this.getProductQuantity(element)
       
       });
      })

      store.select(settingsSelector).subscribe(data=>{
        this.settings=data

        this.TotalBasicPrice=0
        this.TotalTax=0
        this.TotalShipping=0
        this.Total=0

        this.dataSource.forEach(element => {
            this.TotalBasicPrice+= (element.Price * element.nItems)
            this.TotalTax += (element.Price * element.nItems*data.TaxPercent)
            this.TotalShipping +=(element.Price * element.nItems*data.ShippingPercent)

        }  )
        this.Total=this.TotalBasicPrice+this.TotalTax+this.TotalShipping

      })
      store.select(loggedFS).subscribe(data=>{
        this.Logged=data
        this.isLogged=data!=null
        this.ShowSignIn= !this.isLogged
      })
      
     }
     doCheckout(){
      var order={
        UserID:this.Logged.ID,
        Email:this.Logged.UserName,
        //jwt:this.Logged.jwt,
        token:this.Logged.token,
        Address:this.address,
        Phone:this.phone,
        Price:this.TotalBasicPrice,
        Tax:this.TotalTax,
        Shipping:this.TotalShipping,
        Total:this.Total,
        lines:[]
    }
    this.dataSource.forEach(element => {
      var orderLine={
          productID:element.ID,
          unitPrice:element.Price,
          nItems:element.nItems,
          Tax: element.Price*element.nItems*this.settings.TaxPercent,
          Shipping:element.Price*element.nItems*this.settings.ShippingPercent,
          Total:(parseFloat(this.settings.ShippingPercent)+parseFloat(this.settings.TaxPercent)+1) *element.nItems*element.Price

      }
      order.lines.push(orderLine)
      
  })

    console.log(order)
    this.service.AddOrder(order).subscribe(data=>{
      this.ShowMsg=true;
      this.alert="success";
      //this.nQtyError++;
      this.msg=data['Message']
      this.store.dispatch(new RemoveAllAction())      
      setTimeout(() => {
        
        this.router.navigate([''])  
        
      }, 3000);
      
    },e=>{
      console.log(e)
      if(e.status==401)//so it is login related error
      {
          
          this.store.dispatch(new LogoutAction())
          this._snackBar.open("UnAuthorized error 401" , "Close", {
            duration: 5000,
          })
          return;
          //$scope.Logged=null;
          //$scope.ShowMsg=false;
      }
      if(e.error.ErrorType=="DB_Error"){
            
        this.ShowMsg=true;
        this.alert="danger";
        this.msg=e.error.Message
    }
    if(e.error.ErrorType=="qtyErrors")
        {   //qunatity out of stock after check on the server
            //console.log(e.error.qtyErrors)
            e.error.qtyErrors.forEach(element=>{
              //console.log(element)
              
                let nItems=element.nItems;
                let productID=element.productID;
                let realNItems=element.realNItems;
                
                let item=this.dataSource.filter(function(obj){return obj.ID==productID})[0]
                item.q=realNItems;
                item.error= "Only " + realNItems + " units are available for product (" + item.Name + ")"
                this.ErrorsList.push(item.error)
                
            })
            
           // $scope.nQtyError++;
            this.ShowMsg=true;
            this.alert="danger"

        }



    })
     }
     getProductQuantity(element){
      // if(element.error==""){
      this.service.getQtyForProduct({"ID":element.ID}).subscribe((data)=>{
        
        element.qty=parseInt(data['Qty']);
        //element.error="";
        if (element.nItems>element.qty){
                                  
        element.error= "Only " + element.qty + " unit(s) are available for product(" + element.Name + ")."
        //this.nQtyError++;
        this.ErrorsList.push(element.error)
        this.ShowMsg=true;
        this.alert="danger"
         }
       
      },(e)=>{ })
    //}
     }
  ngOnInit(): void {
  }
  gotoCart(){
    this.router.navigate(['Products','Cart'])
  }
  getTotal(){
    let sum:number=0
        this.dataSource.forEach(element => {
         let SubTotal= (element.Price * element.nItems * this.doAdd(this.settings.ShippingPercent,this.settings.TaxPercent,1)).toFixed(2) 
         sum+= parseFloat( SubTotal )
    });
    return sum
      }
  doAdd(...txts):number
  {
    let sum=0
  for(let txt of txts)
   sum +=parseFloat(txt)

   return sum
  }
  getImagePath=function(id){
    if(id==undefined)
    return '';
    return environment.AppName +  "/images/"+ id+ ".jpg"         
}

doLogin(){

}
}
