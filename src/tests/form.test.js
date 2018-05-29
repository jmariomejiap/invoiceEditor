/* eslint-disable function-paren-newline */
import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import { Form } from '../components/form';

Enzyme.configure({ adapter: new Adapter() });

const listItemsMock = [
  {
    item: 'banana',
    qty: 8,
    price: 1.50,
    total: 12,
  },
  {
    item: 'apple',
    qty: 3,
    price: 2.50,
    total: 7.50,
  },
];


describe('Form component renders items being added to invoice', () => {
  test('should render empty form', () => {
    const emptyList = [];
    const dispatchSpy = jest.fn();

    const formWrapper = shallow(
      <Form
        listItems={emptyList}
        dispatch={dispatchSpy}
      />,
    );

    // console.log('debug = ', formWrapper.find(TableRowColumn).debug());

    expect(formWrapper.find(Table).length).toBe(1);
    expect(formWrapper.find(TableHeader).length).toBe(1);
    expect(formWrapper.find(TableRow).length).toBe(1);
    expect(formWrapper.find(TableBody).length).toBe(1);
    expect(formWrapper.find(TableHeaderColumn).at(0).props().children).toBe('Item');
    expect(formWrapper.find(TableHeaderColumn).at(1).props().children).toBe('Qty');
    expect(formWrapper.find(TableHeaderColumn).at(2).props().children).toBe('Price');
    expect(formWrapper.find(TableHeaderColumn).at(3).props().children).toBe('Total');
    expect(formWrapper.find(TableHeaderColumn).at(4).props().children).toBe(undefined);
    expect(formWrapper.find(TableHeader).props().displaySelectAll).toBe(false);
    expect(formWrapper.find(TableHeader).props().adjustForCheckbox).toBe(false);
    expect(formWrapper.find(TableBody).props().displayRowCheckbox).toBe(false);
    expect(formWrapper.find(TableRowColumn).length).toBe(0);
    expect(formWrapper.find(TrashIcon).length).toBe(0);
  });


  test('should render list of items', () => {
    const dispatchSpy = jest.fn();

    const formWrapper = shallow(
      <Form
        listItems={listItemsMock}
        dispatch={dispatchSpy}
      />,
    );

    // rendered items
    expect(formWrapper.find(TableRowColumn).length).toBe(10);
    expect(formWrapper.find(TableRowColumn).at(0).props().children).toBe('banana');
    expect(formWrapper.find(TableRowColumn).at(1).props().children).toBe(8);
    expect(formWrapper.find(TableRowColumn).at(2).props().children).toBe('$1.5');
    expect(formWrapper.find(TableRowColumn).at(3).props().children).toBe('$12');
    expect(formWrapper.find(TrashIcon).length).toBe(2);
  });


  test('should delete item', () => {
    const dispatchSpy = jest.fn();

    const formWrapper = shallow(
      <Form
        listItems={listItemsMock}
        dispatch={dispatchSpy}
      />,
    );

    // rendered items
    expect(formWrapper.find(TableRowColumn).length).toBe(10);
    expect(formWrapper.find(TableRowColumn).at(0).props().children).toBe('banana');
    expect(formWrapper.find(TableRowColumn).at(1).props().children).toBe(8);
    expect(formWrapper.find(TableRowColumn).at(2).props().children).toBe('$1.5');
    expect(formWrapper.find(TableRowColumn).at(3).props().children).toBe('$12');
    expect(formWrapper.find(TrashIcon).length).toBe(2);

    formWrapper.find(TrashIcon).at(0).simulate('click');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  function setup(listItems = []) {
    const muiTheme = getMuiTheme();
    const props = {
      listItems,
      dispatch: jest.fn(),
    };

    const enzymeWrapper = mount(<Form {...props} />, {
      context: { muiTheme },
      childContextTypes: { muiTheme: PropTypes.object },
    });

    return {
      props,
      enzymeWrapper,
    };
  }

  test('should mount Form component.', () => {
    const { enzymeWrapper } = setup(listItemsMock);
    expect(enzymeWrapper.find(Table).length).toBe(1);
    expect(enzymeWrapper.find(TableHeader).length).toBe(1);
    expect(enzymeWrapper.find(TableRow).length).toBe(3);
    expect(enzymeWrapper.find(TableBody).length).toBe(1);
    expect(enzymeWrapper.find(TableHeaderColumn).at(0).text()).toBe('Item');
    expect(enzymeWrapper.find(TableHeaderColumn).at(1).text()).toBe('Qty');
    expect(enzymeWrapper.find(TableHeaderColumn).at(2).text()).toBe('Price');
    expect(enzymeWrapper.find(TableHeaderColumn).at(3).text()).toBe('Total');
    expect(enzymeWrapper.find(TableHeaderColumn).at(4).text()).toBe('');

    // test item contents
    const item = enzymeWrapper.find(TableRowColumn);
    expect(item.at(0).text()).toBe('banana');
    expect(item.at(1).text()).toBe('8');
    expect(item.at(2).text()).toBe('$1.5');
    expect(item.at(3).text()).toBe('$12');
    expect(item.at(4).find(TrashIcon).props().style).toEqual({ width: 18, height: 18 });

    // enzymeWrapper.find(TableRowColumn).at(4).find(TrashIcon).simulate('click');

    expect(item.at(5).text()).toBe('apple');
    expect(item.at(6).text()).toBe('3');
    expect(item.at(7).text()).toBe('$2.5');
    expect(item.at(8).text()).toBe('$7.5');
    console.log('mount = ', item.at(4).find(TrashIcon).props());
  });
});
