import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
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
   constructor(private store:Store<StoreInterface>) { 
    store.select(loggedSelector).subscribe(data=>{
      this.Logged=data 
      console.log(data)
      console.log("----------")
      if(data==null && this.connection?.state==HubConnectionState.Connected){
        console.log("******* do log out *******")  
        this.connection.stop()
      }
      if(data!=null && this.connection?.state==HubConnectionState.Disconnected){
        console.log("******* do log in *******")  
        this.connection.start() 
      }

    })
    }
    setSignalRHandlers(){
      this.connection.on('broadcastMessage', (message: string) => {
        console.log(message)
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
        .build();
        
        this.setSignalRHandlers();
        
      this.connection
        .start()
        .then(() => {
          console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
      
          
         
          if(this.Logged!=null){  
          this.connection  .invoke('Hello').then(data=>{},e=>{
            //if wrong token. so need logout
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
  
}

