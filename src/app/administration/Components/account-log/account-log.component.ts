import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-account-log',
  templateUrl: './account-log.component.html',
  styleUrls: ['./account-log.component.css']
})
export class AccountLogComponent implements OnInit {
  UserID
  Logged
  items
  errorMessage
  constructor(private router:Router,
    private route:ActivatedRoute,
    private store:Store<StoreInterface>,
    private prev:PreviousRouteService,
    private Service:AdminService) {
      this.route.paramMap.subscribe(
        params=>{
           this.UserID=params.get('id')
          })
          store.select(loggedSelector).subscribe(data=>{
            this.Logged=data
            Service.GetAccountLog(this.Logged.token,{UserID:this.UserID}).subscribe(data=>{
              this.items=data
              console.log(this.items)
            },e=>{
              if(e.status==401){
                this.errorMessage="Token expired , please log in"
               setTimeout(()=>{
                 console.log("LOG OUT")
                 this.store.dispatch(new LogoutAction())
               },3000)
              
             }
            })
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
