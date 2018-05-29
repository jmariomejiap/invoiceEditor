import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/app';
import NavBar from '../components/navBar';
import FormContainer from '../components/formContainer';
import InputContainer from '../components/inputInvoice';

Enzyme.configure({ adapter: new Adapter() });


describe('App component', () => {
  test('should render Invoice component.', () => {
    const AppComponent = shallow(<App />);
    expect(AppComponent.find(NavBar).length).toBe(1);
    expect(AppComponent.find('div').length).toBe(2);
    expect(AppComponent.find('div').contains(<FormContainer />)).toBe(true);
    expect(AppComponent.find('div').contains(<InputContainer />)).toBe(true);
  });
});
