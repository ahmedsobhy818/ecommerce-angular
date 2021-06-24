import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-vendors',
  templateUrl: './manage-vendors.component.html',
  styleUrls: ['./manage-vendors.component.css']
})
export class ManageVendorsComponent implements OnInit {
  Logged
  users
  errorMessage=null
  
  constructor(private store:Store<StoreInterface>,
    private prev:PreviousRouteService,
    private router:Router,
    private service:AdminService) {
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
setTimeout(()=>{
  service.GetVendors(this.Logged?.token).subscribe(data=>{
    this.users=data    
    })

},1000)
      })
   }
   doBack(){
    let url=this.prev.getPreviousUrl()
    console.log(url)
    this.router.navigateByUrl(url)
  }
  ngOnInit(): void {
  }
  getimg(photo,Gender){
    let image=photo
    if(image=="")
      image=Gender + ".png"
    return environment.AppName + "/images/users/" + image
  }
  activate(user){
   this.service.ChangeUserState(user.Id,1,this.Logged.token).subscribe(data=>{
      user.Approved=true;
      
   },e=>{
    if(e.status==401){
      this.errorMessage="Token expired , please log in"
     setTimeout(()=>{
       console.log("LOG OUT")
       this.store.dispatch(new LogoutAction())
     },3000)
    
   }
   })
  }
  deActivate(user){
    this.service.ChangeUserState(user.Id,0,this.Logged.token).subscribe(data=>{
      user.Approved=false;
      
   },e=>{
    if(e.status==401){
      this.errorMessage="Token expired , please log in"
     setTimeout(()=>{
       console.log("LOG OUT")
       this.store.dispatch(new LogoutAction())
     },3000)
    
   }
   })
  }
}
