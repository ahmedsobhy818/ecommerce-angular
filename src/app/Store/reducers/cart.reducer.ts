import { JsonPipe } from '@angular/common'
import { isNgTemplate } from '@angular/compiler'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SET_QUANTITY,INCREMENT_QUANTITY, REMOVE_PRODUCT,REMOVE_ALL } from '../actions/cart.action'
import { CustomAction } from '../store'

export interface Cart{ //interface of this State , we used it in "StoreInterface" interface in store.ts file
    //cartItems:Array<{product:{ID:number, price:number},nItems:number}>
    cartItems:Array<{product:any,nItems:number}>
}
let initialState:Cart={// initail State (Data) to manage.comes from local storage
    cartItems:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')).cartItems:[] //[]
}

export function cartReducer(state:Cart=initialState,action:CustomAction){ //the reducer function to manage this state
    //by default "action" is of type "Action"  , we used our "CustomAction" to pass payload from action to reducer
     console.log(state)
    //at first we have the initial state
   
    //let index=state.cartItems.findIndex((item => item.product.ID == action.payload?.product_id))
    let index=0
    if(action.type==SET_QUANTITY || action.type==INCREMENT_QUANTITY  || action.type==REMOVE_PRODUCT )
      index=state.cartItems.findIndex((item => item.product.ID == action.payload?.product.ID))

    let newArr =[... state.cartItems]//copy cartItems array to neweArr
    
    switch(action.type){       //based on type of coming action ,
        case SET_QUANTITY:
         console.log(action.payload?.n)  
         if(index>-1)//set quantity for element exist on the cart
              {
                  //for arrayes , i cant push to the array or change it directly from the reducer,
                  // so i do map() to create new array from the inital array
                newArr=  newArr.map((item)=>{
                    
                
                    if(item.product.ID==action.payload?.product.ID)
                     {
                         return { product:item.product, nItems:/*item.nItems+*/action.payload?.n  }
                     }
                     else
                      return item
                })

                let ret= {
                    cartItems:newArr
                }
                localStorage.setItem('cart',JSON.stringify(ret))
                return ret
              }
            else{//set quantity for element NOT exist on the cart
                
                newArr.push({product:action.payload.product ,nItems:action.payload.n })
                let ret= {
                    cartItems:newArr
                }
                localStorage.setItem('cart',JSON.stringify(ret))
                return ret
            }  
        case INCREMENT_QUANTITY:
            //the same comments as SET_QUANTITY
            if(index>-1)
              {
                newArr=  newArr.map((item)=>{
                    
                
                    if(item.product.ID==action.payload?.product.ID)
                     {
                         return { product:item.product, nItems:item.nItems+1  }
                     }
                     else
                      return item
                })
                let ret= {
                    cartItems:newArr
                }
                localStorage.setItem('cart',JSON.stringify(ret))
                return ret
               
              }
            else{
         
                
                newArr.push({product:action.payload.product ,nItems:1 })
                let ret= {
                    cartItems:newArr
                }
                localStorage.setItem('cart',JSON.stringify(ret))
                return ret
            }
        case REMOVE_PRODUCT:
           
           if(index>-1)
             {
               
                 newArr.splice(index,1)
               
                 let ret= {
                    cartItems:newArr
                }
                localStorage.setItem('cart',JSON.stringify(ret))
                return ret
             }
    case REMOVE_ALL:
         
    let ret= {cartItems:[]}
    localStorage.setItem('cart',JSON.stringify(ret))
    return ret
    
     default: 
     localStorage.setItem('cart',JSON.stringify(state))
     return state
    }
    
    }
    
    export let cartFS=createFeatureSelector<Cart>("cart") 
 export let cartSelector=createSelector(cartFS,s=>s)