import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/services/loading-service.service';
import { OperatorService } from 'src/app/services/operator.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
products
error
approveSpinner=false;
suspendSpinner=false;
RowIndex:number=-1
token
//success=false

  constructor(private service:OperatorService,
    private store:Store<StoreInterface>,
    private loadingService:LoadingService) {

      store.select(loggedSelector).subscribe(data=>{
        this.token=data.token
        service.getProducts(data.token).subscribe(p=>{
          this.products=p;
         
        },e=>{this.HandleError(e)})
        
      })
///
this.loadingService.SmallLoadingBehaviour.subscribe(data=>{
  if(data==null)
  return;

  let SpinnerVarName=data.SpinnerVarName
  let ShowSpinner=data.ShowSpinner
  if(ShowSpinner)
   this[SpinnerVarName]=ShowSpinner
   else{
    setTimeout(() => {
      this[SpinnerVarName]=ShowSpinner
    }, 2000);} 
})
///
   
   }

  ngOnInit(): void {
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
    
    else{
     this.error=e.error?.message
    //console.log(e)
    }
     //this.success=false
  }

  getimg(product){
    return environment.AppName + "/images/Products/" + product.Image
      
  }
  doApprove(product,index:number){
    this.RowIndex=index
    this.service.ApproveProduct(product,this.token,"approveSpinner").subscribe(data=>{
       this.error=null;
       setTimeout(()=>{this.products.splice(index,1)},2000)
    },
    e=>{
      this.HandleError(e)
    })
  }
  doSuspend(product,index : number){
    this.RowIndex=index
    this.service.SuspendProduct(product,this.token,"suspendSpinner").subscribe(data=>{
      this.error=null;
      setTimeout(()=>{this.products.splice(index,1)},2000)
       
   },
   e=>{
     this.HandleError(e)
   })
  }
}
