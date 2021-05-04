import { User } from '../reducers/logged.reducer'

export const LOGIN='[logged] login' //best bractice "[reducerName] ActionName"
export const LOGOUT= '[logged] logout'

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
