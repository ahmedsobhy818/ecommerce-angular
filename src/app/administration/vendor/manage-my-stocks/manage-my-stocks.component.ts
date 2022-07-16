import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { element } from 'protractor';
import { VendorService } from 'src/app/services/vendor.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-my-stocks',
  templateUrl: './manage-my-stocks.component.html',
  styleUrls: ['./manage-my-stocks.component.css']
})
export class ManageMyStocksComponent implements OnInit {
  Logged
  cmbIndex="0"
  error=null
  success=false
  products
  stockItems:Array<stockItem>=[]
  ActiveStocks
  PendingStocks
  
  constructor(private store:Store<StoreInterface>,
    private service:VendorService) {
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
        service.getProducts(this.Logged.token).subscribe(prs=>{
         
          this.products=prs["ActiveProducts"]
          console.log(this.products)
        })
      })
     }

  ngOnInit(): void {
  }
  AddStockItem(){
    this.stockItems.push({ Description:'' , Name:'', Unit:'' , Image:'' , Price:0 , ProductId:'',Quantity:0 })
  }
  DelStockItem(i:number){
    this.stockItems.splice(i,1)
  }
  AllStockItemsExcepetMe(i:number):Array<stockItem>
  {
    return this.stockItems.filter((val,index)=>{return index!=i})
  }
  doSelectItem(i:number,$event){
    let product=this.products.filter(p=>p.ID==$event.target.value)[0]
    console.log(product)
    this.stockItems[i].Description=product?.Description
    this.stockItems[i].Image=product?.Image
    this.stockItems[i].Unit=product?.Unit
    this.stockItems[i].Price=product?.Price
  }
  getimg(img){
    return environment.AppName + "/images/Products/" + img
      
  }
  doSave(){
    var stock={
      lines:[]
    }
    this.stockItems.forEach(element => {
      stock.lines.push(element)
    });
    this.service.doSaveStock (stock, this.Logged.token).subscribe(data=>{
 alert('Stock is saved. stock id =' + data)
 this.stockItems=[]
    },e=>{
   this.HandleError(e)   
    })
  }
  HandleError(e){
    if(e.status==401){
      this.error="Token expired , please log in"
     setTimeout(()=>{
       console.log("LOG OUT")
       this.store.dispatch(new LogoutAction())
     },3000)
    
   }

   // if(e.status==403){
   //   this.error = "You are not authorized to create new administrator"
   // }
    
    else
     this.error=e.error?.Message

     this.success=false
  }

  cmbChange($event){
    if(this.cmbIndex=="1"){
      this.service.getActiveStocksForVendor(this.Logged.token).subscribe(data=>{
           this.ActiveStocks=data;
           console.log(this.ActiveStocks)    
      },e=>{
        this.HandleError(e);
      })
    }

    if(this.cmbIndex=="2"){
      this.service.getPendingStocksForVendor(this.Logged.token).subscribe(data=>{
           this.PendingStocks=data;
           console.log(this.PendingStocks)    
      },e=>{
        this.HandleError(e);
      })
    }
  }
}

interface stockItem{
  Name:string ,
  Description:string,
  Unit:string,
  Image:string,
  ProductId:string,
  Price:number,
  Quantity:number
}
