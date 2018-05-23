import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Divider } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import { submitItem } from '../actions';


const styles = {
  container: {
    textAlign: 'left',
    display: 'flex-inline',
    flexDirection: 'row',
  },
};

class InputInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      qty: '',
      price: '',
      errorQty: '',
      errorPrice: '',
    };
  }

  handleChangeItem = (event) => {
    this.setState({
      item: event.target.value,
    });
  };

  handleChangeQty = (event) => {
    const { value } = event.target;
    if (isNaN(value)) {      
      return this.setState({ errorQty: 'please enter a number' });
    }
    this.setState({
      qty: value,
      errorQty: '',
    });
  };

  handleChangePrice = (event) => {
    const { value } = event.target;
    if (isNaN(value)) {
      return this.setState({ errorPrice: 'please enter a number' });
    }
    this.setState({
      price: value,
      errorPrice: '',
    });
  };

  handleSubmit = () => {
    const { item, qty, price } = this.state;
    const { dispatch } = this.props;
    if (item && qty && price) {
      this.setState({
        item: '',
        qty: '',
        price: '',
      });
      return dispatch(submitItem({ item, qty, price }));
    }
  }

  handleClear = () => {
    const { item, qty, price } = this.state;
    if (item || qty || price) {
      this.setState({
        item: '',
        qty: '',
        price: '',
      });
    }
  };


  render() {
    return (
      <div style={styles}>
        <Paper 
          style={{ padding: 10, height: 330, width: 330, paddingRight: 20, paddingLeft: 20 }}
        >
          <h3>Add Item</h3>
          <Divider/>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p style={{ width: 100 }}>Item: </p>
            <TextField
              fullWidth={true}
              id="text-field-controlled"
              value={this.state.item}              
              onChange={this.handleChangeItem}
            />
          </div>          
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p style={{ width: 100 }}>Quantity : </p>
            <TextField
              id="text-field-controlled"
              value={this.state.qty}
              errorText={this.state.errorQty}          
              onChange={this.handleChangeQty}
            />
          </div>          
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p style={{ width: 100 }}>Price : </p>
            <TextField
              id="text-field-controlled"
              value={this.state.price}              
              errorText={this.state.errorPrice}
              onChange={this.handleChangePrice}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
            <div>
              <FloatingActionButton
                secondary={true}
                mini={true}
                style={{}}
                onClick={this.handleClear}
              >
                <ContentRemove />
              </FloatingActionButton>
            </div>
            
            <FloatingActionButton
              onClick={this.handleSubmit}
            >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </Paper>
      </div>
    );
  }
};


export default connect()(InputInvoice);
