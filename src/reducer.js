import { combineReducers } from 'redux';
import { ADD_NEW_ITEM, CALCULATE_TAX_TOTAL, REMOVE_ITEM } from './actions';

const initalState = {
  listItems: [
  //  {
  //   item: 'lulo',
  //   qty: 2,
  //   price: 1.50,
  //   total: 3,    
  //  },
  //  {
  //   item: 'apple',
  //   qty: 2,
  //   price: 1.50,
  //   total: 3,    
  //  },
  //  {
  //   item: 'pear',
  //   qty: 2,
  //   price: 1.50,
  //   total: 3,    
  //  },
  ],
  subTotal: null,// 3,
  tax: null, // 0.015,
  total: null, // 3.015
};


const invoiceReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return {
        ...state,
        listItems: [...state.listItems, action.itemData]
      }
    
    case REMOVE_ITEM:
      return {
        ...state,
        listItems: state.listItems.filter((item, index) => index !== action.position)
      }
  
    case CALCULATE_TAX_TOTAL:
      const subTotal = state.listItems.reduce((acc, item) => acc + item.total, 0);      
      const tax = Number(((subTotal / 100) * 5).toFixed(2));      
      const total = subTotal + tax;      
      return {
        ...state,
        subTotal,
        tax,
        total,
      }

    default:
      return state;
  }
}

const reducer = combineReducers({ invoiceReducer });

export default reducer;
