import React from 'react';
import Paper from 'material-ui/Paper';
import Form from './form';
import Summary from './summary';

const style = {
  height: 600,
  width: 700,
  marginTop: 100,
  display: 'flex-inline',
  flexDirection: 'row',
};

const InvoiceContainer = () => (
  <div style={style}>
    <Paper>
      <Form />
      <Summary />
    </Paper>
  </div>
);

export default InvoiceContainer;
