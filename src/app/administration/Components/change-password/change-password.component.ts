import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { LoadingService } from 'src/app/services/loading-service.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  submitSpinner=false
  error=null
success=false
Logged
  constructor(private service:AccountService,
    private loadingService:LoadingService
    ,private store:Store<StoreInterface>,
    private prev:PreviousRouteService,
    private router:Router) { 

      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
      })

      this.loadingService.SmallLoadingBehaviour.subscribe(data=>{
        if(data==null)
        return;
  
        let SpinnerVarName=data.SpinnerVarName
        let ShowSpinner=data.ShowSpinner
          this[SpinnerVarName]=ShowSpinner
        
      })
    }

  ngOnInit(): void {
  }
  doBack(){
    let url=this.prev.getPreviousUrl()
    console.log(url)
    this.router.navigateByUrl(url)
  }
  onSubmit(f){
var obj={
  OldPassword:f.form.value.oldpassword,
  NewPassword:f.form.value.password,
  ConfirmPassword:f.form.value.confirm,
  //ID:this.Logged.ID,
  token:this.Logged.token

}
this.error=null
this.success=false
this.service.ChangePassword(obj,"submitSpinner").subscribe(data=>{
  this.success=true
},e=>{
  console.log(e)
  this.error=e.error.Message

  })
}
}