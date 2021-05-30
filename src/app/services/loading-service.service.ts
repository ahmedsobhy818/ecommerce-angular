import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public LoadingBehaviour:BehaviorSubject<boolean> ;
  constructor() { 
    this.LoadingBehaviour=new BehaviorSubject<boolean>(false);
  }

  

  public setLoadingState(state:boolean)
  {
       this.LoadingBehaviour.next(state)//show/hide Http spinner
  }
}
