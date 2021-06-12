import { createFeatureSelector, createSelector } from '@ngrx/store'
import { retry } from 'rxjs/operators'
import { LOGIN, LOGOUT, UPDATEPROFILE } from '../actions/logged.action'
import { CustomAction } from '../store'

export interface User{ //interface of this State , we used it in "StoreInterface" interface in store.ts file
    ID:number,
    CreationDate:Date,
    Gender:string,
    Name:string,
    UserName:string,
    Address:string,
    PhotoURL:string,
    State:boolean,
    Phone:string,
    UserType:string, 
    canAddNewAdmin:boolean,
    DefaultPage:string,
    URL:string,
    policies:number,
    token:string //for asp.net core basic  authentication and jwt authentication
}
//initial state of "logged" come from local storage
let initialState:User=   localStorage.getItem('Logged')?JSON.parse(localStorage.getItem('Logged')):null
//let HubUserServie:SignalrHubServiceForUser=new SignalrHubServiceForUser(null);

export function loggedReducer(state:User=initialState,action:CustomAction){ //the reducer function to manage this state
    //by default "action" is of type "Action"  , we used our "CustomAction" to pass payload from action to reducer
     
    //at first we have the initial state
   let ret:User=null
    switch(action.type){       //based on type of coming action ,
        case LOGIN:
           ret=action.payload
           localStorage.setItem('Logged',JSON.stringify(ret))
           break;
        case LOGOUT:
            ret=null
            localStorage.removeItem('Logged')
            break; 
        case UPDATEPROFILE:
            var obj=JSON.parse( localStorage.getItem('Logged') )
            obj.Address=action.payload.Address
            obj.Phone=action.payload.Phone
            obj.URL=action.payload.URL
            obj.PhotoURL=action.payload.Photo
            console.log(obj)
            localStorage.setItem('Logged',JSON.stringify(obj))
            ret=obj
            break;
     default: 
          ret= state
          break;
    }

    return ret
    }

 export let loggedFS=createFeatureSelector<User>("logged") 
 export let loggedSelector=createSelector(loggedFS,s=>s)
