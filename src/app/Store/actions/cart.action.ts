export const SET_QUANTITY='[cart] setQuantity' //best bractice "[reducerName] ActionName"
export const INCREMENT_QUANTITY= '[cart] incQuantity'
export const REMOVE_PRODUCT='[cart] removeProd'
export const REMOVE_ALL='[cart] removeAll'

//Actions classes
export class SetQuantityAction{
    type:string = SET_QUANTITY
    //payload:{product_id:number,n:number,price:number}
    payload:{product:any,n:number}
    
    constructor( payload:{product:any,n:number}) {
        this.payload=payload        
    }
}
export class IncrementQuantityAction{
    type:string = INCREMENT_QUANTITY
    payload:{product:any}
    
    constructor( payload:{product:any}) {
        this.payload=payload        
    }
}
export class RemoveProductAction{
    type:string = REMOVE_PRODUCT
    payload:{product:any}
    
    constructor( payload:{product:any}) {
        this.payload=payload        
    }
}
export class RemoveAllAction{
    type:string = REMOVE_ALL
/*
    payload:{product_id:number}
    
    constructor( payload:{product_id:number}) {
        this.payload=payload        
    }
    */
}