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
    // console.log('find()', inputWrapper.find('div').at(1).find('p').text());

    // verify main props
    expect(inputWrapper.find(FloatingActionButton).at(0).props().secondary).toBe(true);
    expect(inputWrapper.find(FloatingActionButton).at(0).props().mini).toBe(true);

    // expect(inputWrapper.find(TableBody).length).toBe(1);
    // expect(inputWrapper.find(TableRow).length).toBe(3);
    // expect(inputWrapper.find(TableRowColumn).length).toBe(6);
    // expect(inputWrapper.find(TableBody).props().displayRowCheckbox).toBe(false);
    // const subTotalItem = inputWrapper.find(TableRowColumn);

    // // verify placeholders to be empty
    // expect(subTotalItem.at(0).contains(<TableRowColumn hoverable={false}>Subtotal</TableRowColumn>)).toBe(true);
    // expect(subTotalItem.at(1).contains(<TableRowColumn hoverable={false}>$</TableRowColumn>)).toBe(true);
    // expect(subTotalItem.at(2).contains(<TableRowColumn hoverable={false}>Tax (5%)</TableRowColumn>)).toBe(true);
    // expect(subTotalItem.at(3).contains(<TableRowColumn hoverable={false}>$</TableRowColumn>)).toBe(true);
    // expect(subTotalItem.at(4).contains(<TableRowColumn hoverable={false}>Total</TableRowColumn>)).toBe(true);
    // expect(subTotalItem.at(5).contains(<TableRowColumn hoverable={false}>$</TableRowColumn>)).toBe(true);
  });

  test('clear button should clear values', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    // simulate state data.
    inputWrapper.setState({
      item: 'banana',
      qty: 5,
      price: 2,
    });

    expect(inputWrapper.find('#item-field').props().value).toBe('banana');
    expect(inputWrapper.find('#qty-field').props().value).toBe(5);
    expect(inputWrapper.find('#price-field').props().value).toBe(2);
    // console.log('value before = ', inputWrapper.find('#item-field').props().value);
    // console.log('find Clear button', inputWrapper.find(FloatingActionButton).at(0).simulate('click'));

    inputWrapper.find(FloatingActionButton).at(0).simulate('click');
    expect(inputWrapper.find('#item-field').props().value).toBe('');
    expect(inputWrapper.find('#qty-field').props().value).toBe('');
    expect(inputWrapper.find('#price-field').props().value).toBe('');

    // console.log('value after = ', inputWrapper.find('#item-field').props().value);
  });

  test('should not submit if input data is incomplete.', () => {
    const dispatchSpy = jest.fn();

    const inputWrapper = shallow(
      <InputInvoice
        dispatch={dispatchSpy}
      />,
    );

    // simulate state data.
    inputWrapper.setState({
      item: 'banana',
      qty: '',
      price: 2,
    });

    inputWrapper.find(FloatingActionButton).at(1).simulate('click');

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(inputWrapper.find('#item-field').props().value).toBe('banana');
    expect(inputWrapper.find('#qty-field').props().value).toBe('');
    expect(inputWrapper.find('#price-field').props().value).toBe(2);
  });
});

