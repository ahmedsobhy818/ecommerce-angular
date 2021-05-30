import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ADD_PRODUCT_WISHLIST, REMOVE_ALL_WISHLIST, REMOVE_PRODUCT_WISHLIST, TOGGLE_PRODUCT_WISHLIST } from "../actions/wishlist.action"
import { CustomAction } from "../store"

export interface Wishlist{ //interface of this State , we used it in "StoreInterface" interface in store.ts file
    wishlistItems:Array<{product:any}>
}
let initialState:Wishlist={// initail State (Data) to manage.comes from local storage
    wishlistItems:localStorage.getItem('wishlist')?JSON.parse(localStorage.getItem('wishlist')).wishlistItems:[] //[]
}

export function wishlistReducer(state:Wishlist=initialState,action:CustomAction){ //the reducer function to manage this state
    //by default "action" is of type "Action"  , we used our "CustomAction" to pass payload from action to reducer
     console.log(state)

     let index=0
     if(action.type==REMOVE_PRODUCT_WISHLIST || action.type==TOGGLE_PRODUCT_WISHLIST  )
       index=state.wishlistItems.findIndex((item => item.product.ID == action.payload?.product.ID))

       let newArr =[... state.wishlistItems]//copy wishlistItems array to newArr
       let ret={wishlistItems:[]};

       switch(action.type){       //based on type of coming action ,
        case ADD_PRODUCT_WISHLIST:
            newArr.push({product:action.payload.product })
            ret= { wishlistItems:newArr}
            localStorage.setItem('wishlist',JSON.stringify(ret))
            return ret
        
        case REMOVE_PRODUCT_WISHLIST:    
        if(index>-1)
        {
            newArr.splice(index,1)
            ret= {wishlistItems:newArr}
            localStorage.setItem('wishlist',JSON.stringify(ret))
            return ret
        }

        case TOGGLE_PRODUCT_WISHLIST:
        if(index>-1)//product exist
        {
            newArr.splice(index,1)
            ret= {wishlistItems:newArr}
            localStorage.setItem('wishlist',JSON.stringify(ret))
            return ret
        }
        else //product not exist
        {
            newArr.push({product:action.payload.product })
            ret= { wishlistItems:newArr}
            localStorage.setItem('wishlist',JSON.stringify(ret))
            return ret
        }
        case REMOVE_ALL_WISHLIST:         
          ret= {wishlistItems:[]}
          localStorage.setItem('wishlist',JSON.stringify(ret))
          return ret;
        default: 
          localStorage.setItem('wishlist',JSON.stringify(state))
          return state
       }

}

export let wishlistFS=createFeatureSelector<Wishlist>("wishlist") 
export let wishlistSelector=createSelector(wishlistFS,s=>s)