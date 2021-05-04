import { Action, ActionReducerMap } from "@ngrx/store/src";
import { Cart, cartReducer } from './reducers/cart.reducer';
import { loggedReducer, User } from './reducers/logged.reducer';
import { Settings, settingsReducer } from './reducers/settings.reducer';

export interface StoreInterface{//interface contains pairs of reducer names and interfaces of States managed by the reducers
    cart: Cart,// "Cart" is interface , it represents the interface of the "State"  managed by "cart" reducer 
    settings:Settings,
    logged:User
}  
export interface CustomAction{ //by default angular uses interface called "Action" for actions , it contains "type" only , we do our action class to add "payload" to it . "payload" will hold the action's parameters
    type:string,    
    payload?:any
}

//we have 3 reducers, the settings reducer uses "effect" technique because settings are returned from  a service
export const reducers:ActionReducerMap<StoreInterface>={ //this object will be used in app.module . this object contains all reducers in the store
    cart:cartReducer , //"cart" is the reducer name  , "cartReducer" is the name of the reducer function
    settings:settingsReducer,
    logged:loggedReducer
}
