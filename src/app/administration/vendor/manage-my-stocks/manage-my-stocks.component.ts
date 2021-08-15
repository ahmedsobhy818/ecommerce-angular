import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VendorService } from 'src/app/services/vendor.service';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-manage-my-stocks',
  templateUrl: './manage-my-stocks.component.html',
  styleUrls: ['./manage-my-stocks.component.css']
})
export class ManageMyStocksComponent implements OnInit {
  Logged
  error=null
  success=false
  
  constructor(private store:Store<StoreInterface>,
    private service:VendorService) {
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
      })
     }

  ngOnInit(): void {
  }
  
}
