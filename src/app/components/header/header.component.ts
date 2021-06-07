import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { element } from 'protractor';
import { AccountService } from 'src/app/services/account.service';
import { SignalrHubServiceForUser } from 'src/app/services/HubsServices/signalr-hub-service.service';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { wishlistSelector } from 'src/app/Store/reducers/wishlist.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
cartJson
Logged
isLogged
nItems
nWishList
nNewNotifications
itemsPrice
StoreName
TaxPercent
ShippingPercent

TotalTaxes
TotalShippings
Total
constructor(private store:Store<StoreInterface>,
  private router:Router,
  private service:AccountService,
  private SignalRForUser:SignalrHubServiceForUser) {
    store.subscribe(data=>{
      console.log(data)
      this.cartJson=data.cart.cartItems
      let n=0
      let items_price=0
    this.StoreName=data.settings.StoreName
    this.TaxPercent=data.settings.TaxPercent
    this.ShippingPercent=data.settings.ShippingPercent
      data.cart.cartItems.forEach (element=>{
        n+=element.nItems
        items_price+= (element.nItems * element.product.Price)
      })
      this.nItems=n==0?'':n
      this.itemsPrice=items_price
      this.TotalTaxes=( this.itemsPrice * this.TaxPercent).toFixed(2)
      this.TotalShippings=(this.itemsPrice * this.ShippingPercent).toFixed(2)
      this.Total= (this.itemsPrice * (1+ parseFloat( this.TaxPercent)+parseFloat( this.ShippingPercent))).toFixed(2)

    
    this.Logged=data.logged
    this.isLogged= data.logged!=null
    })

    store.select(wishlistSelector).subscribe(data=>{
      this.nWishList=data.wishlistItems?.length==0?'':data.wishlistItems?.length
    })
    store.select(loggedSelector).subscribe(log_data=>{
      console.log("HEADER LOGGED SELECTOR")
      service.getNewNotificationsCount({
        "ID":this.Logged?.ID,
        "token":this.Logged?.token
      }).subscribe(
        data=>this.nNewNotifications=data!=0?data:''
      )
    })

    
   }

  ngOnInit(): void {
    this.SignalRForUser.hubNewNotify.subscribe(data=>{
      if(data)
       this.nNewNotifications++;
      else
       this.nNewNotifications=''
    })
    this.SignalRForUser.hubDecrementNotify.subscribe(data=>{
      if(data)
       this.nNewNotifications--;

       if(this.nNewNotifications==0)
       this.nNewNotifications='';
    })
    
  }
  goHome(){
    this.router.navigate(['']);     
  }
  gotoWishlist(){
    this.router.navigate(['Products','Wishlist']);     
  }
  gotoNotifications(){
    this.router.navigate(['Account','Notifications']);     
  }
/*
  gotoCart(){
  this.router.navigate(['Products','Cart']);   
}

@ViewChild(MatMenuTrigger) trigger:MatMenuTrigger;
openCartMenu(){
this.trigger.openMenu()
}
closeCartMenu(){
  this.trigger.closeMenu()
  }*/
}
