import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrGeneralHubService {
  connection:HubConnection
  
  hubMessage: BehaviorSubject<string>; //used to return observable contain the returned data from the hub
  hubNewData: BehaviorSubject<number>; //used to return observable contain the returned data from the hub
  hubFinsihData: BehaviorSubject<string>; //used to return observable contain the returned data from the hub
  hubConnectionOff: BehaviorSubject<boolean>; //used to return observable contain the returned data from the hub
  Logged
  constructor(private Router:Router,private store:Store<StoreInterface>) { 
  this.hubMessage=new BehaviorSubject<string>("");
  this.hubNewData=new BehaviorSubject<number>(0);
  this.hubFinsihData=new BehaviorSubject<string>("");
  this.hubConnectionOff=new BehaviorSubject<boolean>(false);

  store.select(loggedSelector).subscribe(data=>{this.Logged=data})
    console.log('general hub service');
   }
   private  setSignalRHandlers(){

    this.connection.on('broadcastMessage', (message: string) => {
      this.hubMessage.next(message);
    });
    this.connection.on('newData', (message: number) => {
      this.hubNewData.next(message);
    });
    this.connection.on('finishedData', (message: string) => {
      this.hubFinsihData.next(message);
    });
    /* 
    this.connection.onclose(e=>{
      console.log(`error in general hub. the error is : ${e.message}`)
      this.hubConnectionOff.next(true);
    })*/
    this.connection.onreconnecting(()=>{
      console.log("reconnecting...")
      this.hubConnectionOff.next(true);
    })
    this.connection.onreconnected(()=>{
      console.log("reconnected !")
      this.hubConnectionOff.next(false);
    })
   }
  public initiateSignalrConnection(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.connection = new HubConnectionBuilder() 
       .withUrl(environment.AppName + '/hub_general',{accessTokenFactory:()=>{return this.Logged?.token }}) // the SignalR server url
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
  
     this.setSignalRHandlers();

      this.connection
        .start()
        .then(() => {
          console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
          this.hubConnectionOff.next(false);
         // this.connection  .invoke('Hello').then(data=>{},e=>{
         //   console.log(e)
         // })
        
          //
          resolve(null);//
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
          this.hubConnectionOff.next(true);
          reject();
        });
    });
  
  }

  GetDataStreamFromLongTimeOperation(){
     this.connection .invoke('GetDataStreamFromLongTimeOperation')
  }
}
