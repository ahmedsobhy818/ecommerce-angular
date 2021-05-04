import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
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
//NameControl:FormControl=new FormControl()
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
      //x=>console.log("x:" + x)
      this.service.checkEmailExist({'Email':x}).subscribe(
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
      Password:f.form.value.password
  }
  ///
  this.ShowMessage=false;

this.service.doSignUp(obj).subscribe((data)=>{
    
  

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
     
      this.doClose()
    }, 5000);

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
  
}
doClose(){
  this.dialogRef.close();
}
}
