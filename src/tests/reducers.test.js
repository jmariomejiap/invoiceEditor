/* eslint-disable no-unused-vars */
import React from 'react';
import reducer from '../reducer';
import {
  CALCULATE_TAX_TOTAL,
  ADD_NEW_ITEM,
  REMOVE_ITEM,
} from '../actions';


const initalState = {
  listItems: [],
  subTotal: null, // 3,
  tax: null, // 0.015,
  total: null, // 3.015
};

const itemData1 = {
  item: 'apple',
  qty: 2,
  price: 2.5,
  total: 2.5 * 2,
};

const itemData2 = {
  item: 'banana',
  qty: 3,
  price: 1.9,
  total: 1.9 * 3,
};

const stateWithItem = {
  listItems: [itemData1],
  subTotal: null,
  tax: null,
  total: null,
};

const stateWithTwoItems = {
  listItems: [itemData1, itemData2],
  subTotal: null,
  tax: null,
  total: null,
};

describe('invoice reducer', () => {
  it('should return inital state', () => {
    expect(reducer(undefined, {})).toEqual({ invoiceReducer: initalState });
  });

  it('should add a new Item', () => {
    expect(reducer({}, {
      type: ADD_NEW_ITEM,
      itemData: itemData1,
    })).toEqual({ invoiceReducer: stateWithItem });
  });

  it('should calculate Tax for Items in invoice', () => {
    expect(reducer({ invoiceReducer: stateWithTwoItems }, {
      type: CALCULATE_TAX_TOTAL,
    })).toEqual({
      invoiceReducer: {
        listItems: [itemData1, itemData2],
        subTotal: 10.7,
        tax: 0.54,
        total: 11.24,
      },
    });
  });

  it('should remove 2 Item in invoice', () => {
    expect(reducer({ invoiceReducer: stateWithTwoItems }, {
      type: REMOVE_ITEM,
      position: 1,
    })).toEqual({
      invoiceReducer: stateWithItem,
    });
  });
});

