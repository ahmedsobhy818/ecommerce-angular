import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { SignalrHubServiceForUser } from 'src/app/services/HubsServices/signalr-hub-service.service';
import { LoadingService } from 'src/app/services/loading-service.service';
import { LoginAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ShowMessage=false
  message=''
  isLogged=false
  alert=''
  submitSpinner=false
  constructor(private service:AccountService,
              private store:Store<StoreInterface>,
              private loadingService:LoadingService,
              public dialogRef: MatDialogRef<LoginComponent>
              ,private SignalRForUser:SignalrHubServiceForUser) {
                store.select(loggedSelector).subscribe((data)=>{
                  this.isLogged= data!=null
                  if(this.isLogged){
                    this.ShowMessage=true
                    this.alert='danger'
                    this.message='aleady logged in'          
                  }
                })

                this.loadingService.SmallLoadingBehaviour.subscribe(data=>{
                  if(data==null)
                  return;
        
                  let SpinnerVarName=data.SpinnerVarName
                  let ShowSpinner=data.ShowSpinner
                  if(ShowSpinner)
                   this[SpinnerVarName]=ShowSpinner
                   else{
                    setTimeout(() => {
                      this[SpinnerVarName]=ShowSpinner
                    }, 1000);} 
                })

               }
  onSubmit(f){
    
  var obj={
    Email:f.form.value.email,
    Password:f.form.value.password
         }
         this.ShowMessage=false;
         this.service.doLogin(obj,"submitSpinner").subscribe((data)=>{
              let Logged=data['Data']
              Logged.token=data['token']
              this.store.dispatch(new LoginAction(Logged))  //the component dispatchs an action to the reducer  

              this.ShowMessage=true;
              this.alert="success";
              this.message=data['Message'];
              f.form.value.email=''
              f.form.value.password=''
              setTimeout(() => {
                this.doClose()
              }, 2000);
         },(e)=>{
           console.log(e)
          this.ShowMessage=true;
          this.alert="danger";
          this.message=e.error.Message;
         })
}
  ngOnInit(): void {
  }
  doClose(){
    this.dialogRef.close();
  }
}
