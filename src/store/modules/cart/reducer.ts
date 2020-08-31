import { Reducer } from "redux";
import produce from 'immer';

import { IcartState, ActionTypes } from "./types";

const INITIAL_STATE: IcartState = {
    items: [],
    failedStockCheck: []
}

const cart:Reducer<IcartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch(action.type){
      case ActionTypes.addProductToCartSuccess:   {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(item => 
          item.product.id === product.id,  
        );

        if(productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1
          });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }
      default: {
        return state;
      }
    }
  });
}

export default cart;