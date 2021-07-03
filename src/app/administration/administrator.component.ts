import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignalrGeneralHubService } from '../services/HubsServices/signalr-general-hub.service';
import { SignalrHubServiceForUser } from '../services/HubsServices/signalr-hub-service.service';
import { loggedSelector } from '../Store/reducers/logged.reducer';
import { StoreInterface } from '../Store/store';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  Logged
  constructor( private store:Store<StoreInterface>  ) 
    {
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
      })
   }
   
  
   ngOnInit(): void {
  }

}
