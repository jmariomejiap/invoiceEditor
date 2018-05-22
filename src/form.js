import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import { deleteItem } from './actions';


class Form extends Component {
  handleRemove = (position) => {
    console.log('position = ', position);
    this.props.dispatch(deleteItem(position));
  }

  render() {
    const { listItems } = this.props;
    return (
      <Table height={'320px'} >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow >
            <TableHeaderColumn>Item</TableHeaderColumn>
            <TableHeaderColumn>Qty</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Total</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 15 }} />  
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {listItems.map((element, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>{element.item}</TableRowColumn>
                <TableRowColumn>{element.qty}</TableRowColumn>
                <TableRowColumn>{`$${element.price}`}</TableRowColumn>
                <TableHeaderColumn>{`$${element.total}`}</TableHeaderColumn>
                <TableHeaderColumn style={{ width: 15 }}>
                  <TrashIcon
                    style={{ width: 18, height: 18 }}
                    onClick={() => this.handleRemove(index)}
                    hoverColor={'red'}
                  />
                </TableHeaderColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    listItems: store.invoiceReducer.listItems,
  }
}

export default connect(mapStateToProps)(Form);
