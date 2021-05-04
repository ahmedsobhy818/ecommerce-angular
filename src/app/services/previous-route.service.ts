import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
//service to record the enavigation of the pages in the application,
//so we can use this service to get back url
//i used it in the product page's cancel button
export class PreviousRouteService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        
      };
    });
  }

  public getPreviousUrl() {
   if(this.previousUrl==this.currentUrl)//if i entered directly to a page 
    return "/"; //then the back url will equal main page

    return this.previousUrl;
  } 
}
