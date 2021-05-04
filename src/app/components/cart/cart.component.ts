import { Component, DoCheck, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { RemoveProductAction, SetQuantityAction } from 'src/app/Store/actions/cart.action';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit  {
  dataSource
  settings

  displayedColumns: string[] = ['Index','Image','Name', 'Price','nItems','TotalPrice','Tax','Shipping','SubTotal', 'Remove']
  constructor(private store:Store<StoreInterface>,
    private router:Router) {
    store.subscribe(data=>{
      let index=1
    this.dataSource= data.cart.cartItems.map((element)=>{
      return{
      Index:index++,
       ID:element.product.ID,
      Name:element.product.Name,
      ArabicName:element.product.ArabicName ,
      nItems:element.nItems,
      Price:element.product.Price
  
      }
     })
  
    this.settings=data.settings
    })
        
   }
  
  getTotal(){
let sum:number=0
    this.dataSource.forEach(element => {
     let SubTotal= (element.Price * element.nItems * this.doAdd(this.settings.ShippingPercent,this.settings.TaxPercent,1)).toFixed(2) 
     sum+= parseFloat( SubTotal )
});
return sum
  }
  ngOnInit(): void {
  }
  //@ViewChild('tbl', {static:true}) Table: MatTable<any >;
  Remove(ID){
    //let index=this..findIndex((item => item.ID == ID))
   //this.dataSource.splice(index,1)
   this.store.dispatch(new RemoveProductAction({product:{ID:ID} }))  //the component dispatchs an action to the reducer  
   //this.Table.renderRows()
  }
  doAdd(...txts):number
  {
    let sum=0
  for(let txt of txts)
   sum +=parseFloat(txt)

   return sum
  }
  doUpdate(){
    this.dataSource.forEach(element => {
      
     let ID=element.ID
     let Number=element.nItems
     this.store.dispatch(new SetQuantityAction({product:{ID:ID},n:Number }))  //the component dispatchs an action to the reducer       

 });
  }
  gotoCheckout(){
    this.router.navigate(['Products','Checkout'])
  }
  getImagePath=function(id){
    if(id==undefined)
    return '';
    return environment.AppName +  "/images/"+ id+ ".jpg"         
}
}
