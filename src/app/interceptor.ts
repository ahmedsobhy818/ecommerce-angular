import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize , retry } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { LoadingService } from './services/loading-service.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor{
    
    totalRequests:number =0//numbmere of current requests uses the 
    //big blue general spinner
    //if it is >0 then show the spinnere ,else hide it

    constructor(private loadingService: LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {  //returns observable

      if(req.headers.has('CustomSpinner'))  
      {
       //request with CustomSpinner header , will not use the big blue general spinner
      // , it will have its own spinner
      
      let SpinnerVarName=req.headers.get('CustomSpinner')
      //send to the component throug the service , to show the small spinner
      this.loadingService.setLoadingStateForSmallSpinner(SpinnerVarName,true)
      }
      else  
      {
        //for requests uses general big blue spinner
          this.totalRequests++;
          //send to app component throrug the service to show the big blue general spinner
          this.loadingService.setLoadingState(true);
        }
        
        return next.handle(req).pipe( //return observable of the new request
              
            finalize(() => {
              if(req.headers.has('CustomSpinner'))
              {
                let SpinnerVarName=req.headers.get('CustomSpinner')
                //send to the component throug the service , to hide the small spinner
                this.loadingService.setLoadingStateForSmallSpinner(SpinnerVarName,false)
              }
              else
                this.totalRequests--;
           
                // console.log(`-----${this.totalRequests}-----`)
            if (this.totalRequests === 0) {
              {
                //send to app component throrug the service to hide the big blue general spinner
                this.loadingService.setLoadingState(false);
              }
            }
          })
        );  
        
    }
}
