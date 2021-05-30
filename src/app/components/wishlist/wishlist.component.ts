import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RemoveProductFromWishlistAction } from 'src/app/Store/actions/wishlist.action';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  dataSource
  settings
  displayedColumns: string[] = ['Index','Image','Name', 'Price','Tax','Shipping','SubTotal', 'Remove']
  
  constructor(private store:Store<StoreInterface>,
    private router:Router) {
    store.subscribe(data=>{
      let index=1
    this.dataSource= data.wishlist.wishlistItems.map((element)=>{
      return{
      Index:index++,
       ID:element.product.ID,
      Name:element.product.Name,
      ArabicName:element.product.ArabicName ,
      //nItems:element.nItems,
      Price:element.product.Price
  
      }
     })
  
    this.settings=data.settings
    })
        
   }
   Remove(ID){
       this.store.dispatch(new RemoveProductFromWishlistAction({product:{ID:ID} }))  //the component dispatchs an action to the reducer  
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
  ngOnInit(): void {
  }

}
