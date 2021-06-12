import { User } from '../reducers/logged.reducer'

export const LOGIN='[logged] login' //best bractice "[reducerName] ActionName"
export const LOGOUT= '[logged] logout'
export const UPDATEPROFILE = '[logged] updateprofile'

//Actions classes
export class LoginAction{
    type:string = LOGIN
    payload:User
    
    constructor( payload:User) {
        this.payload=payload        
    }
}
export class LogoutAction{
    type:string = LOGOUT
    
    
    constructor( ) {
        
    }
}

export class UpdateProfileAction{
    type:string = UPDATEPROFILE
    payload:{Address:string , Phone:string,Photo:string , URL:string}

    constructor(payload:{Address:string , Phone:string,Photo:string , URL:string}){
        this.payload=payload
    }
}