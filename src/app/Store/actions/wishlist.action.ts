export const ADD_PRODUCT_WISHLIST='[wishlist] addProd'
export const REMOVE_PRODUCT_WISHLIST='[wishlist] removeProd'
export const TOGGLE_PRODUCT_WISHLIST='[wishlist] toggleProd'
export const REMOVE_ALL_WISHLIST='[wishlist] removeAll'


//Actions classes

export class AddProductToWishlistAction{
    type:string = ADD_PRODUCT_WISHLIST
    payload:{product:any}
    
    constructor( payload:{product:any}) {
        this.payload=payload        
    }
}
export class RemoveProductFromWishlistAction{
    type:string = REMOVE_PRODUCT_WISHLIST
    payload:{product:any}
    
    constructor( payload:{product:any}) {
        this.payload=payload        
    }
}
export class ToggleProductInWishlistAction{
    type:string = TOGGLE_PRODUCT_WISHLIST
    payload:{product:any}
    
    constructor( payload:{product:any}) {
        this.payload=payload        
    }
}

export class ClearWishlistAction{
    type:string = REMOVE_ALL_WISHLIST

}