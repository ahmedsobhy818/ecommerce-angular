
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FAILED, SUCCESS } from '../actions/settings.action'
import { CustomAction } from '../store'

export interface Settings{ //interface of this State , we used it in "StoreInterface" interface in store.ts file
    
        StoreName:string,
        ShippingPercent:number,
        TaxPercent:number,
        StorePercent:number
  }

let initialState:Settings={// initail State (Data) to manage
StoreName:'',
ShippingPercent:0,
TaxPercent:0,
StorePercent:0    
}

export function settingsReducer(state:Settings=initialState,action:CustomAction){ //the reducer function to manage this state
    //by default "action" is of type "Action"  , we used our "CustomAction" to pass payload from action to reducer
     console.log(state)
    //at first we have the initial state
    
    switch(action.type){       //based on type of coming action ,
        case SUCCESS:      
        console.log('scs')
    return action.payload
        
    case FAILED:
        console.log('fal')
    console.log(action.payload)       
      return state
    
      default:
        console.log(action.type)
      return state 
    }
    
    }
    
    export let settingsFS=createFeatureSelector<Settings>("settings") 
    export let settingsSelector=createSelector(settingsFS,s=>s)