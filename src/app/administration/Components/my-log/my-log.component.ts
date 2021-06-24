import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-my-log',
  templateUrl: './my-log.component.html',
  styleUrls: ['./my-log.component.css']
})
export class MyLogComponent implements OnInit {
token
items
  constructor(service:AccountService,
    private store:Store<StoreInterface> ,
    private prev:PreviousRouteService,
    private router:Router) {
      store.select(loggedSelector).subscribe(data=>{
        this.token=data.token
        setTimeout(()=>{
          service.GetMyLog(this.token).subscribe(log=>{
            this.items=log
           })
        },1000)
        
      })
     }

  ngOnInit(): void {
  }
  doBack(){
    let url=this.prev.getPreviousUrl()
    console.log(url)
    this.router.navigateByUrl(url)
  }
}


