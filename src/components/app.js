import React from 'react';
import NavBar from './navBar';
import FormContainer from './formContainer';
import InputContainer from './inputInvoce';

const styles = {
  mainContainer: {
    display: 'flex-inline',
    flexDirection: 'row',
    backgroundColor: 'black',
    height: '98vh',
  },
  invoiceContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

const Invoice = () => (
  <div style={styles.mainContainer}>
    <NavBar />
    <div style={styles.invoiceContainer}>
      <FormContainer />
      <InputContainer />
    </div>
  </div>
);

export default Invoice;
