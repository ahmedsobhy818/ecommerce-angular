import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/internal/operators/filter';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { ProductsService } from 'src/app/services/products-service.service';
import { RemoveProductAction, SetQuantityAction } from 'src/app/Store/actions/cart.action';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { cartSelector } from 'src/app/Store/reducers/cart.reducer';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
productID
TabIndex=-1
product
ShowError=false
Comments:any=[]
ShowComments=false
AllowAddComment=false
nItems=0
showCart=false
isLogged=false
Logged=null
  constructor(private service:ProductsService,
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<StoreInterface>,
    private prev:PreviousRouteService,
    private _snackBar: MatSnackBar) {
      this.route.paramMap.subscribe(
        params=>{
           this.productID=params.get('id')
           this.TabIndex=params.get('action')=='Comments'?1:0
           service.getAProduct({ID:this.productID}).subscribe(
            (data)=>{this.product=data;console.log(this.product)},
            (e)=>{this.ShowError=true}
          )
           if(this.TabIndex==1){
           
             this.ShowComments=true;
            service.getProductComments({productID:this.productID}).subscribe(
              (data)=>{
                this.Comments=data;console.log(this.Comments)
                let Logged=this.Logged
                this.AllowAddComment= (this.Logged!=null) && (!this.ShowError) &&(this.ShowComments) &&  (this.Comments.filter(function(cmt){ return cmt.UserID==Logged.ID}).length==0)
              }
            )
           }
        })
        let product_id=this.productID
        store.select(cartSelector).subscribe(data=>{
          //this.nItems=
          let items=data.cartItems.filter(
            function(item){
              return item.product.ID==product_id
            }
          )
         this.nItems=  items.length==0?0:items[0].nItems
        })
        store.select(loggedSelector).subscribe(data=>{
          this.isLogged=data!=null
          this.Logged=data
          console.log(data?.ID)
          this.AllowAddComment= (this.Logged!=null) && (!this.ShowError) &&(this.ShowComments) &&  (this.Comments.filter(function(cmt){ return cmt.UserID==data.ID}).length==0)
        })
     }
     
  ngOnInit(): void {
    
  }
  goToBasicData(){
    console.log('goto basaic')
    setTimeout(() => {
      this.router.navigate(['ProductDetails',this.productID]);   
    }, 300);
   // 
  }
  goToComments(){
    console.log('goto comments')
    setTimeout(() => {
      this.router.navigate(['ProductDetails',this.productID,"Comments"]);   
    }, 300);
    //
  }
  selectedTabChange(){
    if (this.TabIndex==0)
     this.goToComments();
else
this.goToBasicData();
  }
  ShowCart(){
    this.showCart=true
  }
  ClearCart(){
    //this.store.dispatch(new RemoveProductAction({product_id:this.productID }))  //the component dispatchs an action to the reducer  
    this.store.dispatch(new RemoveProductAction({product:this.product }))  //the component dispatchs an action to the reducer  
    this.showCart=false
  }
  UpdateCart(){
    //this.store.dispatch(new SetQuantityAction({product_id:this.productID , n:this.nItems , price:this.product.Price }))  //the component dispatchs an action to the reducer  
    this.store.dispatch(new SetQuantityAction({product:this.product , n:this.nItems  }))  //the component dispatchs an action to the reducer  
    this.showCart=false
  }
  doBack(){
    let url=this.prev.getPreviousUrl()
    console.log(url)
    this.router.navigateByUrl(url)
  }
  getImagePath=function(id){
    if(id==undefined)
    return '';
    return environment.AppName +  "/images/"+ id+ ".jpg"         
}
GetCmtImg=function(cmt){
  return environment.AppName + "/images/users/"+ cmt.Gender + ".png";
}


addComment(cmt,rat){
  
  var obj={
    "userID":this.Logged.ID,
    "productID":this.productID,
    "value":rat.value,
    "comment":cmt.value,
    "userName":this.Logged.UserName,
   // "jwt":this.Logged.jwt,
    "token":this.Logged.token
}
this.service.addComment(obj).subscribe(data=>{
  obj["Name"]=this.Logged.Name;
  obj["Gender"]=this.Logged.Gender;
  obj["ID"]=0;
  obj["Value"]=obj.value;
  obj["Comment"]=obj.comment,
  obj["UserName"]=obj.userName,
  obj["UserID"]=obj.userID

  this.Comments.unshift(obj);
  let Logged=this.Logged
  this.AllowAddComment= (this.Logged!=null) && (!this.ShowError) &&(this.ShowComments) &&  (this.Comments.filter(function(cmt){ return cmt.UserID==Logged.ID}).length==0)  
},e=>{
  console.log(e);
  let msg="";
  if(e.error==null && e.status==401)
    msg="UnAuthorized Error - 401"
  if(e.error!=null)
   msg=e.error.Message 

  this._snackBar.open(msg , "Close", {
    duration: 5000,
  })

  this.store.dispatch(new LogoutAction())
})
}
}
