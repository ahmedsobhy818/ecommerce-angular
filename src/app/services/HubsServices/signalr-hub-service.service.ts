import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignalrHubServiceForUser {  
connection:HubConnection
Logged
hubNewNotify: BehaviorSubject<boolean>; //used to return observable contain the returned data from the hub
hubNewNotifyObject: BehaviorSubject<any>; //used to return observable contain the returned data from the hub
hubDecrementNotify: BehaviorSubject<boolean>; 
lastLoggedID

constructor(private store:Store<StoreInterface>) { 
  this.hubNewNotify=new BehaviorSubject<boolean>(false);
  this.hubNewNotifyObject=new BehaviorSubject<any>(null);
  this.hubDecrementNotify=new BehaviorSubject<boolean>(false);

  store.select(loggedSelector).subscribe(data=>{
    this.Logged=data 

    if(data==null){
        console.log("******* did log out *******")  
        //all logged users having userId=my userId must be log out
        this.connection?.invoke("ForceLogOutAllSimilarInstances",this.lastLoggedID).then(data=>{
          this.connection?.stop()//after this close my connection
        })
        
      }
      if(data!=null){
        console.log("******* did log in *******")  
        this.lastLoggedID=data.ID
         this.initiateSignalrConnection()//start the connection with new token
      }

    })
    }
    setSignalRHandlers(){
      this.connection.on('broadcastMessage', (message: string) => {
        console.log(message)
      });
      
      this.connection.on('NewNotification', (notification/*: UserNotification*/) => {
        console.log(notification)
        this.hubNewNotify.next(true)  //pass it to the header
        this.hubNewNotifyObject.next(notification)//pass it to notification component
      });
      this.connection.on('ForceLogOut', () => {
            console.log('force log out')
            this.store.dispatch(new LogoutAction())
            this.hubNewNotify.next(false)  //pass to header to reset the counter
        
      });
      
      
    }

    
  public initiateSignalrConnection(): Promise<any>{
    
    return new Promise((resolve, reject) => {
      this.connection = new HubConnectionBuilder() 
       .withUrl(environment.AppName + '/hub_user',{
        accessTokenFactory: () => { 
          // Get and return the access token.
          // This function can return a JavaScript Promise if asynchronous
          // logic is required to retrieve the access token.
         
          //return "Ahmed818-818-Admins,Operators"
 //return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFobWVkc29iaHlAZ21haWwuY29tIiwibmFtZWlkIjoiMzc5ZDJmNDMtOTQ2Ny00YzY0LWJlM2UtODJkNjZmMmRmNDI4Iiwicm9sZSI6IkFETUlOUyIsIm5iZiI6MTYyMTg2NTU4MiwiZXhwIjoxNjIxODY3MzgyLCJpYXQiOjE2MjE4NjU1ODJ9.-8LH1nbbDiwnmzkZb2nDx1QNRftXjQuUwGYsWtwUA7c"
          return this.Logged?.token 
          //return "Basic YWhtZWRzb2JoeUBnbWFpbC5jb206ODE4"
      }
       }) // the SignalR server url
       .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
           // if (retryContext.elapsedMilliseconds < 180000) {
                // If we've been reconnecting for less than 180 seconds so far,
                // wait  10 seconds before the next reconnect attempt.
                return  10000;
           // } else {
                // If we've been reconnecting for more than 180 seconds so far, stop reconnecting.
             //   return null;
           // }
        }
    })// 
       .build();

        //if(this.Logged==null)  
        //  return;  

        //this.connection.serverTimeoutInMilliseconds=5*60*1000
        //this.connection.keepAliveIntervalInMilliseconds=60*1000
        this.setSignalRHandlers();
  // this.connection.stop()

      this.connection
        .start()
        .then(() => {
          console.log(`User SignalR connection success! connectionId: ${this.connection.connectionId} `);
      
          
         
          if(this.Logged!=null){  
          this.connection  .invoke('Hello').then(data=>{},e=>{
            //when i connect i need to access the authorized method
            //"Hello" in the hub , if i failed then this means i have 
            //wrong token , so i must log out
            console.log('force log out')
            this.store.dispatch(new LogoutAction())
          })
        }
          //
          resolve(null);//
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
          reject();
        });
         ////
  ////
    });
  }

  DecreseCounter(){
    this.hubDecrementNotify.next(true)
  }
}

