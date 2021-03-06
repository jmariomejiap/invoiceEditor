import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 20px 0px 20px',
  },
  summaryContainer: {
    width: 200,
    height: 160,
    margin: '0px 30px 10px 0px',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
  },
};

export const Summary = ({ subTotal, tax, total }) => (
  <div style={styles.container}>
    <div style={styles.summaryContainer}>
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow >
            <TableRowColumn>Subtotal</TableRowColumn>
            <TableRowColumn>{subTotal ? `$${subTotal}` : '$'}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Tax (5%)</TableRowColumn>
            <TableRowColumn>{tax ? `$${tax}` : '$'}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Total</TableRowColumn>
            <TableRowColumn>{total ? `$${total}` : '$'}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
);

const mapStateToProps = (store) => {
  return {
    subTotal: store.invoiceReducer.subTotal,
    tax: store.invoiceReducer.tax,
    total: store.invoiceReducer.total,
  };
};

Summary.propTypes = {
  subTotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Summary);

