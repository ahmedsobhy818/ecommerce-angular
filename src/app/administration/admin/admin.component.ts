import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
Logged
  constructor(private store:Store<StoreInterface>) { 
    store.select(loggedSelector).subscribe(data=>{
      this.Logged=data
    })
  }

  ngOnInit(): void {
  }

}
