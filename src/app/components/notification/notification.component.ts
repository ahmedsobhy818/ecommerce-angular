import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { SignalrHubServiceForUser } from 'src/app/services/HubsServices/signalr-hub-service.service';
import { loggedSelector, User } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
Logged:User
isLogged
photo
NewNotifications
OldNotifications
  constructor(private store:Store<StoreInterface>,
    private Service:AccountService,
    private SignalRForUser:SignalrHubServiceForUser,
    private router:Router) { 

    store.select(loggedSelector).subscribe(data=>{
      this.Logged=data
      this.isLogged= this.Logged!=null

      if(this.isLogged){
        Service.getNotifications(
          {
            "ID":this.Logged.ID,   
            "token":this.Logged.token
          }).subscribe(data=>{
          this.photo=data["User"]["ProfilePhoto"]
          this.NewNotifications=data["Notifications"].filter(n=>n.PeriodGroupString=='NEW')
          this.OldNotifications=data["Notifications"].filter(n=>n.PeriodGroupString=='OLD')
          
        })
      }
    })
  }

  ngOnInit(): void {
    this.SignalRForUser.hubNewNotifyObject.subscribe(data=>{
     // console.log(data)
      this.NewNotifications?.unshift(data)
      //console.log(this.NewNotifications)
    })
  }
  DoAction(item){
   this.Service.SeeThisNotification({"ID":item.notification.Id}).subscribe(data=>{
    item.notification.Seen=true 
    this.SignalRForUser.DecreseCounter()
   });
    
    console.log(item)
    //this.router .navigateByUrl("",{})   
  }
  getlink(item){
    //return "['/" + item.notification.ActionLink + "']"
    return  "../../" + item.notification.ActionLink 
  }

}
