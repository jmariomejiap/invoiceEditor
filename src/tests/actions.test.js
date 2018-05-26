import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  CALCULATE_TAX_TOTAL,
  ADD_NEW_ITEM,
  REMOVE_ITEM,
  deleteItem,
  submitItem,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions are being dispatched', () => {
  const itemData = {
    item: 'apple',
    qty: 2,
    price: 2.5,
    total: 2.5 * 2,
  };

  const expectedAddActions = [
    {
      type: ADD_NEW_ITEM,
      itemData,
    },
    {
      type: CALCULATE_TAX_TOTAL,
    },
  ];

  const expectedRemoveActions = [
    {
      type: REMOVE_ITEM,
      position: 2,
    },
    {
      type: CALCULATE_TAX_TOTAL,
    },
  ];

  test('submitActions should dispatch, addNewItem and calculateTax', () => {
    const store = mockStore({ });
    store.dispatch(submitItem(itemData));

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedAddActions);
  });

  test('deleteItem should dispatch, removeItem and calculateTax', () => {
    const store = mockStore({ });
    store.dispatch(deleteItem(2));

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedRemoveActions);
  });
});
