import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { VendorService } from 'src/app/services/vendor.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-manage-my-products',
  templateUrl: './manage-my-products.component.html',
  styleUrls: ['./manage-my-products.component.css']
})
export class ManageMyProductsComponent implements OnInit {
  Logged
  error=null
  success=false
  ActiveProducts :any[]
  PendingProducts:any[]
  SuspendedProducts:any[]
  constructor(private store:Store<StoreInterface>,
    private service:VendorService,
    public dialog: MatDialog) { 
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
        
        service.getProducts(this.Logged.token).subscribe(data=>{
            console.log(data)
           this.ActiveProducts=data['ActiveProducts']
           this.PendingProducts=data['PendingProducts']
           this.SuspendedProducts=data['NotApprovedProducts']

        },e=>{
            this.HandleError(e)
        })
      })
    }    

  addNew(){
    
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '800px',
      height:'800px',
      data: {Item:{ }}
    });

    dialogRef.afterClosed().subscribe(data=>{
      if(data!=undefined){  
        console.log(data.Item)
        this.success=true  
        this.error=null   
        this.service.newProduct(data.Item,this.Logged.token).subscribe(ret=>
         {
          ret['NSold']=ret['Nsold'] 
          ret['AvgRate']=0
           ret['Category']=ret['category']['Name']
           ret['CatID']=ret['CatId'] 
           ret['ID']=ret['Id']
           this.PendingProducts.unshift(ret)
         },e=>{
          this.HandleError(e)  
        })
       
       
      }
    })
  }
  ngOnInit(): void {
  }
  getimg(product){
    return environment.AppName + "/images/Products/" + product.Image
      
  }
  updateProduct(list,index){
    let product=list[index]
    console.log(product)
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '800px',
      height:'800px',
      data: {Item:{
        ID : product.ID,
        Name : product.Name,
        Price : product.Price,
        AvgRate :product.AvgRate,
        NSold : product.Nsold,
        Qty:product.Qty,
        Unit:product.Unit,
        AddedAt:product.AddedAt,
        LastModified:product.LastModified,
        State:product.State,
        Category:product.Category,
        Image:product.Image,
        AdminNotes:product.AdminNotes,
        ArabicName:product.ArabicName,
        Description:product.Description,
        CatID : product.CatID
      }}
    });
    //
    dialogRef.afterClosed().subscribe(data=>{
      if(data!=undefined){  
        console.log(data.Item)
        this.success=true  
        this.error=null   
        this.service.updateProduct(data.Item,this.Logged.token).subscribe(ret=>
         { 
          //ret['LastModified']=ret['LastModified'] 
          //ret['Price']=ret['Price'] 
          //ret['Price']=ret['OldPrice'] 
   
          ret['AvgRate']=data.Item.AvgRate
          //ret['Category']=data.Item.Category 
          ret['Category']=ret['category']['Name']
          ret['CatID']=ret['CatId']
          ret['NSold']=ret['Nsold'] 
          list.splice(index,1)  
          this.PendingProducts.unshift(ret)
          
         },e=>{ 
          this.HandleError(e) 
        })
       
       
      }
    })
    //
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
  doStartStop(product,state){
    this.service.doStartStop({ID:product.ID,state:state},this.Logged.token).subscribe(ret=>
      {
      if(state==0)
       product.State=3
      else
       product.State=1 
      },
      e=>{
        this.HandleError(e)
      }) 

  }
}
