import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { LoadingService } from 'src/app/services/loading-service.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,AfterViewInit {
isLogged
alert
gender=''
message
ShowMessage
@ViewChild('email') email//
alreadyExist=false
EnteredEmail=''
accountType=''
showEmailSpinner=false
submitSpinner=false
  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.email?.valueChanges.pipe(//value changes of #email eleement to check existance of the entered email
      debounceTime(500),
      distinctUntilChanged() /*  ,
      map(term=>{      
        let $result:Observable<any>
       $result=   this.service.checkEmailExist({'Email':term})
       return $result     
    })*/
      ).subscribe(x => {
      if(x=='' || x==null || x==undefined)
       return;

      this.service.checkEmailExist({'Email':x},"showEmailSpinner").subscribe(
        data=>{
          this.alreadyExist=!data
        }  
      )
    })
  }
  setGender(gender){
    this.gender=gender
  }
  onSubmit(f){
    this.EnteredEmail=f.form.value.email
    var obj={
      Name:f.form.value.Name ,
      Email:this.EnteredEmail,
      Gender:this.gender,
      Password:f.form.value.password,
      accountType:this.accountType
  }
  ///
  this.ShowMessage=false;

this.service.doSignUp(obj,"submitSpinner").subscribe((data)=>{
    
  

    this.ShowMessage=true;
    this.alert="success";
    this.message=data['Message'];
    //this.data.newAccount=this.EnteredEmail
    //console.log(`-----${this.data.newAccount}`)
    f.form.value.Name='';
    f.form.value.email='';
    this.gender='';
    f.form.value.password='';
    f.form.value.confirm='';
    setTimeout(() => {
     console.log("closing signup------")
      this.doClose({
         output:this.EnteredEmail
        })
    }, 1000); 

},(e)=>{
    this.ShowMessage=true;
    this.alert="danger";
    this.message=e.error.Message;
    
})

  }
/**
 *
 */
constructor(private service:AccountService,
            private store:Store<StoreInterface>,
            public dialogRef: MatDialogRef<SignupComponent>,
            private loadingService:LoadingService,
            @Inject(MAT_DIALOG_DATA) public data: {newAccount:string}//data rercieved and sent by MatDialog
            ) {
  
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
doClose(obj){
  this.dialogRef.close(obj);
}
}
