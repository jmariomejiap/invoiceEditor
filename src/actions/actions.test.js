import {
  calculateTotal,
  CALCULATE_TAX_TOTAL,
  addNewItem,
  ADD_NEW_ITEM,
  removeItem,
  REMOVE_ITEM,
} from '../actions';

test('should create an action to add new item', () => {
  const itemData = {
    item: 'apple',
    qty: 2,
    price: 2.5,
    total: 2.5 * 2,
  };

  const expectedAction = {
    type: ADD_NEW_ITEM,
    itemData,
  };
  expect(addNewItem(itemData)).toEqual(expectedAction);
});


test('should create an action to calculate total', () => {
  const expectedAction = {
    type: CALCULATE_TAX_TOTAL,
  };
  expect(calculateTotal()).toEqual(expectedAction);
});

test('should create an action to remove item', () => {
  const position = 2;

  const expectedAction = {
    type: REMOVE_ITEM,
    position,
  };
  expect(removeItem(position)).toEqual(expectedAction);
});
