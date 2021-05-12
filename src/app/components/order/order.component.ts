import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsService } from 'src/app/services/products-service.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedFS } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
Logged
isLogged
ShowSignIn
OrderID
orders
CurrentOrderID=-1
CurrentOrder=null
NotAuth=false
  constructor(private store:Store<StoreInterface>,
    private router:Router,
    private service:ProductsService,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar
    ) {
      store.select(loggedFS).subscribe(data=>{
        
        this.Logged=data
        this.isLogged=data!=null
        this.ShowSignIn= !this.isLogged
        this.loadData()

      })
      this.route.paramMap.subscribe(
        params=>{
         this.OrderID= params.get('id')
         this.loadData()
      
        })
      
     }
     getImagePath=function(id){
      if(id==undefined)
      return '';
      return environment.AppName +  "/images/"+ id+ ".jpg"         
  }
loadData(){
  if(this.isLogged){
    this.service.getOrders({
      "UserID":this.Logged.ID,
      //"jwt":   this.Logged.jwt,
      //"Email": this.Logged.UserName,
      "token":this.Logged.token
  }).subscribe(data=>{
    this.orders=data['Orders']
    this.CurrentOrderID= this.orders.length>0?this.orders[0].OrderID:-1;
    
    if(this.OrderID!=null && this.orders.filter((ord)=>{return ord.OrderID==this.OrderID}).length>0)
      this.CurrentOrderID=this.OrderID
    if(this.OrderID!=null && this.orders.filter((ord)=>{return ord.OrderID==this.OrderID}).length==0)
     {
        this.NotAuth=true
        this.CurrentOrderID=-1
        console.log('not auth')
     }
     
     let list =this.orders.filter((ord)=>{return ord.OrderID==this.CurrentOrderID})
     this.CurrentOrder= list.length==0?null:list[0]
      
        
  },e=>{
    if(e.error==null){
      console.log(e);//authorization header not set- unauthorized 401 
                     //, or user not in the role -forbidden 403
      if(e.status==401)
      {
       
       this._snackBar.open("Authentication Failed 401" , "Close", {
        duration: 5000,
      })
       this.store.dispatch(new LogoutAction())
      }
      if(e.status==403)
       {
        this._snackBar.open("You Are Not Admin" , "Close", {
          duration: 5000,
        })
       }

       
      return;
    }
  /*  if(e.error.ErrorType=="login")//from jwt 
    {
      alert(e.error.Message)  
      this.store.dispatch(new LogoutAction())
    }*/
  })
}
}
  ngOnInit(): void {
  }
  change(value){
    console.log(value)
    this.router.navigate(['Products','Orders',value])
   
  }
}