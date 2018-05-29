import React from 'react';
import Paper from 'material-ui/Paper';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormContainer from '../components/formContainer';
import Form from '../components/form';
import Summary from '../components/summary';


Enzyme.configure({ adapter: new Adapter() });

describe('FormContainer wraps form and summay', () => {
  test('should render FormContainer', () => {
    const FormWrapper = shallow(<FormContainer />);
    expect(FormWrapper.find('div').length).toBe(1);
    expect(FormWrapper.find(Paper).length).toBe(1);
    expect(FormWrapper.find('div').find(Paper).contains(<Form />)).toBe(true);
    expect(FormWrapper.find('div').find(Paper).contains(<Summary />)).toBe(true);
  });
});
