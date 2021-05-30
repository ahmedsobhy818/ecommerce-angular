import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize , retry } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { LoadingService } from './services/loading-service.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor{
    
    totalRequests:number =0

    constructor(private loadingService: LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {  //returns observable
        
        this.totalRequests++;
        this.loadingService.setLoadingState(true);
        
        
        return next.handle(req).pipe( //return observable of the new request
              
            finalize(() => {
            this.totalRequests--;
            console.log(`-----${this.totalRequests}-----`)
            if (this.totalRequests === 0) {
              this.loadingService.setLoadingState(false);
            }
          })
        );  
        
    }
}
