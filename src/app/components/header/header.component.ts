import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { element } from 'protractor';
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
itemsPrice
StoreName
TaxPercent
ShippingPercent

TotalTaxes
TotalShippings
Total
constructor(private store:Store<StoreInterface>,
  private router:Router) {
    store.subscribe(data=>{
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


   }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(['']);     
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