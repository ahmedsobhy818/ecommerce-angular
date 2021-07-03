import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SignalrGeneralHubService } from 'src/app/services/HubsServices/signalr-general-hub.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})


export class FooterComponent implements OnInit {
newData=0
msg=""

  constructor(
    private signalRService:SignalrGeneralHubService)
     {   }
   

  ngOnInit(): void {
    //this.router.onSameUrlNavigation = 'reload'//to reload
    this.signalRService.GetDataStreamFromLongTimeOperation()  
    this.signalRService.hubMessage.subscribe(data=>{
      this.msg=data;
    })
    this.signalRService.hubFinsihData.subscribe(data=>{
      this.msg=data;
    })
    this.signalRService.hubNewData.subscribe(data=>{
      this.newData=data;
    })
   
  }

}
