import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount } from 'enzyme';
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


describe('Form component renders items being added to invoice', () => {
  test('should render template Form component.', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find(Table).length).toBe(1);
    expect(enzymeWrapper.find(TableHeader).length).toBe(1);
    expect(enzymeWrapper.find(TableRow).length).toBe(1);
    expect(enzymeWrapper.find(TableBody).length).toBe(1);
    expect(enzymeWrapper.find(TableHeaderColumn).at(0).text()).toBe('Item');
    expect(enzymeWrapper.find(TableHeaderColumn).at(1).text()).toBe('Qty');
    expect(enzymeWrapper.find(TableHeaderColumn).at(2).text()).toBe('Price');
    expect(enzymeWrapper.find(TableHeaderColumn).at(3).text()).toBe('Total');
    expect(enzymeWrapper.find(TableHeaderColumn).at(4).text()).toBe('');

    expect(enzymeWrapper.find(TableHeader).props().displaySelectAll).toBe(false);
    expect(enzymeWrapper.find(TableHeader).props().adjustForCheckbox).toBe(false);

    expect(enzymeWrapper.find(TableBody).props().displayRowCheckbox).toBe(false);
  });


  test('should render 2 Items Form component.', () => {
    const data = [
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
    const { enzymeWrapper } = setup(data);
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
  });
});
