/* eslint-disable function-paren-newline */
/* eslint-disable max-len */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Paper, TextField, Divider, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { InputInvoice } from '../components/inputInvoice';

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
  incompleteState: {
    item: 'banana',
    qty: '',
    price: 2,
  },
  state: {
    item: 'banana',
    qty: 5,
    price: 2,
  },
};


describe('InputInvoice component', () => {
  test('should render component.', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    expect(inputWrapper.find('div').length).toBe(6);
    expect(inputWrapper.find(Paper).length).toBe(1);
    expect(inputWrapper.find('h3').text()).toBe('Add Item');
    expect(inputWrapper.find('div').at(1).find('p').text()).toBe('Item: ');
    expect(inputWrapper.find('div').at(2).find('p').text()).toBe('Quantity : ');
    expect(inputWrapper.find('div').at(3).find('p').text()).toBe('Price : ');
    expect(inputWrapper.find(Divider).length).toBe(1);
    expect(inputWrapper.find(TextField).length).toBe(3);
    expect(inputWrapper.find(FloatingActionButton).length).toBe(2);
    expect(inputWrapper.find(FloatingActionButton).length).toBe(2);
    expect(inputWrapper.find(FloatingActionButton).at(0).contains(<ContentRemove />)).toBe(true);
    expect(inputWrapper.find(FloatingActionButton).at(1).contains(<ContentAdd />)).toBe(true);

    // verify main props
    expect(inputWrapper.find(FloatingActionButton).at(0).props().secondary).toBe(true);
    expect(inputWrapper.find(FloatingActionButton).at(0).props().mini).toBe(true);
  });


  test('clear button should clear values', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    // simulate state data.
    inputWrapper.setState(mockData.state);

    expect(inputWrapper.find('#item-field').props().value).toBe('banana');
    expect(inputWrapper.find('#qty-field').props().value).toBe(5);
    expect(inputWrapper.find('#price-field').props().value).toBe(2);

    inputWrapper.find(FloatingActionButton).at(0).simulate('click');
    expect(inputWrapper.find('#item-field').props().value).toBe('');
    expect(inputWrapper.find('#qty-field').props().value).toBe('');
    expect(inputWrapper.find('#price-field').props().value).toBe('');
  });


  test('should not submit if input data is incomplete.', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    // simulate state data.
    inputWrapper.setState(mockData.incompleteState);

    inputWrapper.find(FloatingActionButton).at(1).simulate('click');
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(inputWrapper.find('#item-field').props().value).toBe('banana');
    expect(inputWrapper.find('#qty-field').props().value).toBe('');
    expect(inputWrapper.find('#price-field').props().value).toBe(2);
  });


  test('should successfully submit data and clear inputs', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    // simulate state data.
    inputWrapper.setState(mockData.state);

    expect(inputWrapper.find('#item-field').props().value).toBe('banana');
    expect(inputWrapper.find('#qty-field').props().value).toBe(5);
    expect(inputWrapper.find('#qty-field').props().errorText).toBe('');
    expect(inputWrapper.find('#price-field').props().value).toBe(2);

    inputWrapper.find(FloatingActionButton).at(1).simulate('click');

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(inputWrapper.find('#item-field').props().value).toBe('');
    expect(inputWrapper.find('#qty-field').props().value).toBe('');
    expect(inputWrapper.find('#price-field').props().value).toBe('');
  });


  test('Entering numbers in Item name should display error message', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    inputWrapper.find('#item-field').simulate('change', { target: { value: 'banana' } });
    expect(inputWrapper.find('#item-field').props().errorText).toBe('');
    expect(inputWrapper.find('#item-field').props().value).toBe('banana');
    inputWrapper.setState({ item: '', errorItem: '' });

    inputWrapper.find('#item-field').simulate('change', { target: { value: 'bana4' } });

    expect(inputWrapper.find('#item-field').props().value).not.toBe('bana4');
    expect(inputWrapper.find('#item-field').props().errorText).toBe('names can only contain letters');
  });


  test('Entering non-numerical values for Qty should display error message', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    inputWrapper.find('#qty-field').simulate('change', { target: { value: 55 } });
    expect(inputWrapper.find('#qty-field').props().errorText).toBe('');
    expect(inputWrapper.find('#qty-field').props().value).toBe(55);
    inputWrapper.setState({ qty: '', errorQty: '' });

    inputWrapper.find('#qty-field').simulate('change', { target: { value: 'sad' } });
    expect(inputWrapper.find('#qty-field').props().value).not.toBe('sad');
    expect(inputWrapper.find('#qty-field').props().errorText).toBe('please enter a number');
  });


  test('Entering non-numerical values for Price should display error message', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    inputWrapper.find('#price-field').simulate('change', { target: { value: 55 } });
    expect(inputWrapper.find('#price-field').props().errorText).toBe('');
    expect(inputWrapper.find('#price-field').props().value).toBe(55);
    inputWrapper.setState({ qty: '', errorQty: '' });

    inputWrapper.find('#price-field').simulate('change', { target: { value: 'sad' } });

    expect(inputWrapper.find('#price-field').props().value).not.toBe('sad');
    expect(inputWrapper.find('#price-field').props().errorText).toBe('please enter a number');
  });
});

