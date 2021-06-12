import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignalrGeneralHubService } from 'src/app/services/HubsServices/signalr-general-hub.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

//the footer reeads the "action" query string, so it goes to signup or login forms
// when any of them is closed then it redireects to the page where the user where before
//if thee user goes to signup and create new account then he is redirected to login page

export class FooterComponent implements OnInit {
newData=0
msg=""
snackBarRef :MatSnackBarRef<any> =null


  constructor(private route:ActivatedRoute,
    public dialog: MatDialog,
    private router:Router,
    private prev:PreviousRouteService,
    private store:Store<StoreInterface>,
    private signalRService:SignalrGeneralHubService,
    private _snackBar:MatSnackBar
    )
     {
    this.route.queryParamMap.subscribe(params=>{
      let action=params.get('action')
      if(action=="login" || action=="signup"){
        let dialogRef 
        if(action=="login"){
        dialogRef= this.dialog.open(LoginComponent, {
          width: '80%',
          height:'80%'
        });
        }
        else{
          dialogRef= this.dialog.open(SignupComponent, {
            width: '80%',
            height:'80%',
            data: {newAccount:''}
          });
        }
        dialogRef.afterClosed().subscribe(result => {
          let urlTree = this.router.parseUrl(this.router.url);
          if(result!=undefined)//the case when the user create new account succesfully on signup page 
           {
             urlTree.queryParams = {action: 'login'}; //then he is redirected to login page
          }
          else
              urlTree.queryParams = {};  


          let back_url= urlTree.toString();
          this.router.navigateByUrl(back_url)
        });
      }
      if(action=="logout"){
          this.store.dispatch(new LogoutAction()) 
          this.router.navigate([''])
      }
    })

   
   }
   

  ngOnInit(): void {
    //this.router.onSameUrlNavigation = 'reload'//to reload
    this.signalRService.GetDataStreamFromLongTimeOperation()  
    this.signalRService.hubMessage.subscribe(data=>{
      this.msg=data;
    })
    this.signalRService.hubFinsihData.subscribe(data=>{
      this.msg=data;
    })
    this.signalRService.hubNewData.subscribe(data=>{
      this.newData=data;
    })
    this.signalRService.hubConnectionOff.subscribe(data=>{
      if(data)
       {
        if(this.snackBarRef==null)
         this.snackBarRef=  this._snackBar.open("Connection OFF")
        
         
    }
      else
       {
         
         if(this.snackBarRef!=null)
          {
            this.snackBarRef.dismiss();
            this.snackBarRef=null;
            
            setTimeout(() => {
               //to reload
               this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
              };
              this.router.navigateByUrl(this.router.url)
            }, 2000);
          }  
          
  }
    })
  }

}
