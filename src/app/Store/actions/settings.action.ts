import { Settings } from '../reducers/settings.reducer'

export const SUCCESS='[settings] success'
export const FAILED= '[settings] failed'
export const LOAD= '[settings] load'



export class LoadSettingsAction{
    type:string = LOAD
}

export class SuccessAction{
    type:string = SUCCESS
    payload:any
    
    constructor( payload:any) {
        
        this.payload=payload                
    }
}
export class FailedAction{
    type:string = FAILED
    payload:any
    
    constructor(payload:any) {
        this.payload=payload        
    }
}
