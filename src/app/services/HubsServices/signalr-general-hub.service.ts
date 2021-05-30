import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrGeneralHubService {
  connection:HubConnection
  
  hubMessage: BehaviorSubject<string>; //used to return observable contain the returned data from the hub
  hubNewData: BehaviorSubject<number>; //used to return observable contain the returned data from the hub
  hubFinsihData: BehaviorSubject<string>; //used to return observable contain the returned data from the hub

  
  constructor() { 
  this.hubMessage=new BehaviorSubject<string>("");
  this.hubNewData=new BehaviorSubject<number>(0);
  this.hubFinsihData=new BehaviorSubject<string>("");

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
    this.connection.onclose(e=>{
      //basic work of hub reconnecting
      alert(`the error is : ${e.message}`)
      this.connection.start()
    })
   }
  public initiateSignalrConnection(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.connection = new HubConnectionBuilder() 
       .withUrl(environment.AppName + '/hub_general') // the SignalR server url
        .build();
  
     this.setSignalRHandlers();

      this.connection
        .start()
        .then(() => {
          console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
      
         // this.connection  .invoke('Hello').then(data=>{},e=>{
         //   console.log(e)
         // })
        
          //
          resolve(null);//
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
          reject();
        });
    });
  
  }

  GetDataStreamFromLongTimeOperation(){
     this.connection .invoke('GetDataStreamFromLongTimeOperation')
  }
}
