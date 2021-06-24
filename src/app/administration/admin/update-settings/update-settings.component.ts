import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignalrHubServiceForUser } from 'src/app/services/HubsServices/signalr-hub-service.service';
import { LoadingService } from 'src/app/services/loading-service.service';
import { ProductsService } from 'src/app/services/products-service.service';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { settingsSelector } from 'src/app/Store/reducers/settings.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-update-settings',
  templateUrl: './update-settings.component.html',
  styleUrls: ['./update-settings.component.css']
})
export class UpdateSettingsComponent implements OnInit {
settings
TaxPercent=0
ShippingPercent=0
StorePercent=0
StoreName
showSpinner=false
token
error=null
success=false
  constructor(private service:ProductsService,
    private loadingService:LoadingService
    ,private store:Store<StoreInterface>
    ,private SignalRForUser:SignalrHubServiceForUser) {
    store.select(settingsSelector).subscribe(data=>{
    this.settings=data;
    this.TaxPercent=this.settings.TaxPercent *100
    this.ShippingPercent=this.settings.ShippingPercent *100
    this.StorePercent=this.settings.StorePercent *100
    this.StoreName=this.settings.StoreName
   console.log(data)
    })
    store.select(loggedSelector).subscribe(data=>{
      this.token=data.token
    })
    this.loadingService.SmallLoadingBehaviour.subscribe(data=>{
      if(data==null)
      return;

      let SpinnerVarName=data.SpinnerVarName
      let ShowSpinner=data.ShowSpinner
        this[SpinnerVarName]=ShowSpinner
      
    })
   }

  ngOnInit(): void {
  }
  Send(){
    this.error=null
    this.success=false
    var obj={
      StoreName:this.StoreName,
      TaxPercent: this.TaxPercent,
      ShippingPercent:this.ShippingPercent,
      StorePercent:this.StorePercent,
      Id:this.settings.Id,
      token:this.token
    }
    this.service.setSettings(obj,"showSpinner").subscribe(data=>{
      console.log(data)    
      this.success=true
      this.SignalRForUser.LogoutCustomersAndVendors();
    },e=>{
      this.error=e.error
     console.log(e) 
    })  

  }
}
