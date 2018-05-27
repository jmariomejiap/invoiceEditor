import React from 'react';
import AppBar from 'material-ui/AppBar';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from '../components/navBar';


Enzyme.configure({ adapter: new Adapter() });

describe('NavBar component', () => {
  test('should render NavBar', () => {
    const NavBarComponent = shallow(<NavBar />);
    // console.log('console = ', NavBarComponent.props());
    expect(NavBarComponent.find(AppBar).length).toBe(1);
    expect(NavBarComponent.props().title).toBe('Invoice Demo');
    expect(NavBarComponent.props().showMenuIconButton).toBeFalsy();
  });
});
