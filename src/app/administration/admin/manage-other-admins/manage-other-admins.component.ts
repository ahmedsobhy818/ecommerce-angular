import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-other-admins',
  templateUrl: './manage-other-admins.component.html',
  styleUrls: ['./manage-other-admins.component.css']
})
export class ManageOtherAdminsComponent implements OnInit {
Logged
admins
error=null
success=false

AddingNew=false
  constructor(private service:AdminService
    ,private store:Store<StoreInterface>) {
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
setTimeout(()=>{
  service.GetAdmins(this.Logged?.token).subscribe(data=>{
    this.admins=data
    this.admins=this.admins .sort((a,b)=>{if(a.isSuper) return -1; else return 0})     
    })

},1000)
      })
     
     }

  ngOnInit(): void {
  }
  AddNew(){
    this.AddingNew=true
  }
  doCancel(){
    this.AddingNew=false
  }
  addNew(f){
    var obj={
      Email:f.form.value.email,
      Name:f.form.value.name,
      Gender:'M',
      Password:'123',
      accountType:'admin'
    }
    this.error=null
    this.success=false
    
    this. service.AddNewAdmin(obj,this.Logged.token).subscribe(data=>{
this.error=null
this.success=true;
this.AddingNew=false
this.admins.push({
  Name:obj.Name,
  Email:obj.Email,
  isSuper:false,
  Approved:true,
  Gender:'M',
  Time:Date(),
  Id:data['TheUserId'],
  Photo:''
})
   },e=>{
     console.log(e)
     
     if(e.status==401){
       this.error="Token expired , please log in"
      setTimeout(()=>{
        console.log("LOG OUT")
        this.store.dispatch(new LogoutAction())
      },3000)
     
    }

     if(e.status==403){
       this.error = "You are not authorized to create new administrator"
     }
     
     else
      this.error=e.error?.Message

     this.success=false
   })
  }

  getimg(photo,Gender){
    let image=photo
    if(image=="")
      image=Gender + ".png"
    return environment.AppName + "/images/users/" + image
  }
  activate(admin){
   this.service.ChangeUserState(admin.Id,1,this.Logged.token).subscribe(data=>{
      admin.Approved=true;
      
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
  deActivate(admin){
    this.service.ChangeUserState(admin.Id,0,this.Logged.token).subscribe(data=>{
      admin.Approved=false;
      
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



