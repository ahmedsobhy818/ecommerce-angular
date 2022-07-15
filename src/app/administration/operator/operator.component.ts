import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  Logged
  constructor(private store:Store<StoreInterface>) { 
    store.select(loggedSelector).subscribe(data=>{
      this.Logged=data
    })
  }

  ngOnInit(): void {
  }

}
