import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-operators',
  templateUrl: './manage-operators.component.html',
  styleUrls: ['./manage-operators.component.css']
})
export class ManageOperatorsComponent implements OnInit {
  Logged
  users
  error=null
  
  constructor(private service:AdminService
    ,private store:Store<StoreInterface>) { 

      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
setTimeout(()=>{
  service.GetOperators(this.Logged?.token).subscribe(data=>{
    this.users=data    
    })

},1000)
      })
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
      this.error="Token expired , please log in"
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
      this.error="Token expired , please log in"
     setTimeout(()=>{
       console.log("LOG OUT")
       this.store.dispatch(new LogoutAction())
     },3000)
    
   }
   })
  }

}
