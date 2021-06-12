import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Service0Service {//for general intitalizations to be done of the start

  constructor() {
    if(environment.isDotNetCore) {
      environment.AppName=environment.AppNameForDotNetCore 
         console.log('service 0 okkkkk ctorrrr')
    }
   }
  Initialize(){   
  }
}
