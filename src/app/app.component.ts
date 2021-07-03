import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from './services/products-service.service';
import { debounceTime, distinctUntilChanged, map, startWith  } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { StoreInterface } from './Store/store';
import { LoadSettingsAction } from './Store/actions/settings.action';
import { PreviousRouteService } from './services/previous-route.service';
import { MyInterceptor } from './interceptor';
import { LoadingService } from './services/loading-service.service';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { SignalrGeneralHubService } from './services/HubsServices/signalr-general-hub.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutAction } from './Store/actions/logged.action';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
/**
 *
 */
 isLoaded:boolean=false;
 ishttpLoaded:boolean=false;

 snackBarRef :MatSnackBarRef<any> =null

constructor(private store:Store<StoreInterface> , 
  private routeService:PreviousRouteService,
  private loadingService:LoadingService,
  private signalRService:SignalrGeneralHubService,
    private _snackBar:MatSnackBar,
    private router:Router,
    private route:ActivatedRoute,
    public dialog: MatDialog
  )
 {
   
  this.store.dispatch(new LoadSettingsAction())
  ////
  routeService.LoadingBehaviour.subscribe(data=>{
    this.isLoaded=data    
  })
  ////
  loadingService.LoadingBehaviour.subscribe(data=>{
    this.ishttpLoaded=data
  })
  ////
//the components reads the "action" query string, so it goes to signup or login forms
// when any of them is closed then it redirects to the page where the user where before
//if the user goes to signup and create new account then he is redirected to login page

  this.route.queryParamMap.subscribe(params=>{
    let action=params.get('action')
    console.log(`action parameter: ${action}`)
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
        console.log(result)  
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
