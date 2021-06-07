import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from './services/products-service.service';
import { debounceTime, distinctUntilChanged, map, startWith  } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { StoreInterface } from './Store/store';
import { LoadSettingsAction } from './Store/actions/settings.action';
import { PreviousRouteService } from './services/previous-route.service';
import { MyInterceptor } from './interceptor';
import { LoadingService } from './services/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
/**
 *
 */
 isLoaded:boolean=false;
 ishttpLoaded:boolean=false;

constructor(private store:Store<StoreInterface> , 
  private routeService:PreviousRouteService,
  private loadingService:LoadingService
  )
 {
   
  this.store.dispatch(new LoadSettingsAction())
  routeService.LoadingBehaviour.subscribe(data=>{
    this.isLoaded=data
    
  })

  loadingService.LoadingBehaviour.subscribe(data=>{
    //console.log("-*-*-*-*")
    //console.log(data)
    this.ishttpLoaded=data
    //console.log("-*-*-*-*") 
  })
}
}
