/* eslint-disable function-paren-newline */
/* eslint-disable max-len */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Summary } from '../components/summary';

Enzyme.configure({ adapter: new Adapter() });


describe('Summary component', () => {
  test('should render empty summary component.', () => {
    const summaryWrapper = shallow(
      <Summary
        subTotal={0}
        tax={0}
        total={0}
      />,
    );

    expect(summaryWrapper.find('div').length).toBe(2);
    expect(summaryWrapper.find(Table).length).toBe(1);
    expect(summaryWrapper.find(TableBody).length).toBe(1);
    expect(summaryWrapper.find(TableRow).length).toBe(3);
    expect(summaryWrapper.find(TableRowColumn).length).toBe(6);
    expect(summaryWrapper.find(TableBody).props().displayRowCheckbox).toBe(false);
    const subTotalItem = summaryWrapper.find(TableRowColumn);

    // verify placeholders to be empty
    expect(subTotalItem.at(0).contains(<TableRowColumn hoverable={false}>Subtotal</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(1).contains(<TableRowColumn hoverable={false}>$</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(2).contains(<TableRowColumn hoverable={false}>Tax (5%)</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(3).contains(<TableRowColumn hoverable={false}>$</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(4).contains(<TableRowColumn hoverable={false}>Total</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(5).contains(<TableRowColumn hoverable={false}>$</TableRowColumn>)).toBe(true);
  });


  test('summary should render given values.', () => {
    const summaryWrapper = shallow(
      <Summary
        subTotal={50}
        tax={2.5}
        total={52.5}
      />,
    );

    expect(summaryWrapper.find('div').length).toBe(2);
    expect(summaryWrapper.find(Table).length).toBe(1);
    expect(summaryWrapper.find(TableBody).length).toBe(1);
    expect(summaryWrapper.find(TableRow).length).toBe(3);
    expect(summaryWrapper.find(TableRowColumn).length).toBe(6);

    expect(summaryWrapper.find(TableBody).props().displayRowCheckbox).toBe(false);
    const subTotalItem = summaryWrapper.find(TableRowColumn);// .text()).toBe('Subtotal');

    // verify placeholders display values
    expect(subTotalItem.at(0).contains(<TableRowColumn hoverable={false}>Subtotal</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(1).contains(<TableRowColumn hoverable={false}>$50</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(2).contains(<TableRowColumn hoverable={false}>Tax (5%)</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(3).contains(<TableRowColumn hoverable={false}>$2.5</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(4).contains(<TableRowColumn hoverable={false}>Total</TableRowColumn>)).toBe(true);
    expect(subTotalItem.at(5).contains(<TableRowColumn hoverable={false}>$52.5</TableRowColumn>)).toBe(true);
  });
});
