import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { SignalrGeneralHubService } from '../services/HubsServices/signalr-general-hub.service';
import { SignalrHubServiceForUser } from '../services/HubsServices/signalr-hub-service.service';
import { LogoutAction } from '../Store/actions/logged.action';
import { loggedSelector } from '../Store/reducers/logged.reducer';
import { StoreInterface } from '../Store/store';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  Logged
  nNewNotifications
  constructor( private store:Store<StoreInterface>, 
       private router:Router,
       private service:AccountService,
      private SignalRForUser:SignalrHubServiceForUser  ) 
    {
      store.select(loggedSelector).subscribe(log_data=>{
        this.Logged=log_data

        this.nNewNotifications='';  

        if(this.Logged!=null){
          service.getNewNotificationsCount({
            "ID":this.Logged?.ID,
            "token":this.Logged?.token
          }).subscribe(
            data=>this.nNewNotifications=data!=0?data:''
          )
        }
      })
   }
   
  
   ngOnInit(): void {
    this.SignalRForUser.hubNewNotify.subscribe(data=>{
      if(data && this.Logged!=null)
       this.nNewNotifications++;
      else
       this.nNewNotifications=''
    })
    this.SignalRForUser.hubDecrementNotify.subscribe(data=>{
      if(data && this.nNewNotifications>0 &&  this.Logged!=null)
       this.nNewNotifications--;

       if(this.nNewNotifications==0)
       this.nNewNotifications='';
    })
  }
  getimg(photo,Gender){
    let image=photo
    if(image=="")
      image=Gender + ".png"
    return environment.AppName + "/images/users/" + image
  }
  dologout(){
    this.store.dispatch(new LogoutAction())
  }
  gotoNotifications(){
    this.router.navigate(['administration','Notifications']);     
  }
 
  
}
