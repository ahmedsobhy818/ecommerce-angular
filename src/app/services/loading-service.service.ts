import { SplitInterpolation } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public LoadingBehaviour:BehaviorSubject<boolean> ;
  public SmallLoadingBehaviour:BehaviorSubject<any> ;
  constructor() { 
    this.LoadingBehaviour=new BehaviorSubject<boolean>(false);
    this.SmallLoadingBehaviour=new BehaviorSubject<boolean>(null);
  }

  

  public setLoadingState(state:boolean)
  {
       this.LoadingBehaviour.next(state)//show/hide big blue general Http spinner
  }
  public setLoadingStateForSmallSpinner(SpinnerVarName:string,ShowSpinner:boolean)
  {
    //to show/hide small spinner
   this.SmallLoadingBehaviour.next({
     SpinnerVarName:SpinnerVarName,
     ShowSpinner:ShowSpinner
   })
  }
}
