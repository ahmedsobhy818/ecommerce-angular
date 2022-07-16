import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/services/loading-service.service';
import { OperatorService } from 'src/app/services/operator.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css']
})
export class ManageStocksComponent implements OnInit {
  Logged
  error=null
  success=false
  products
  PendingStocks
  ApproveSpinner=false;
  RowIndex:number=-1;
  
  constructor(private store:Store<StoreInterface>,
    private service:OperatorService,
    private loadingService:LoadingService) 
    {
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
         service.getPendingStocksForAll(this.Logged.token).subscribe(stks=>{
          this.PendingStocks=stks;
          console.log(stks);
        })
      })
//
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
//
     }
     getimg(img){
      return environment.AppName + "/images/Products/" + img
        
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
    ApproveStock(Id,index:number){
      this.RowIndex=index;
      this.service.ApproveStock(Id,this.Logged.token,"ApproveSpinner")
      .subscribe(data=>{
        setTimeout(() => {
          (this.PendingStocks as any[]).splice(index,1)  
        }, 2000);    
        
      },e=>{
        this.HandleError(e)
      })
    }
  ngOnInit(): void {
  }

}


