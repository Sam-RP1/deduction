import React from 'react';

// Enzyme Imports
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Component Imports
import Footer from '../Footer';
import { NavLink } from 'react-router-dom';
import ToggleSwitch from '../../UI/ToggleSwitch/ToggleSwitch';

// Enzyme configuration
configure({ adapter: new Adapter() });

// Test cases
describe('<Footer /> | Component', () => {
    it('should render <ToggleSwitch />', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find(<ToggleSwitch />));
    });

    it('should render <NavLink />', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find(<NavLink to='/settings' />));
    });

    it('should render <ToggleSwitch /> and <NavLink />', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find(<ToggleSwitch />));
        expect(wrapper.find(<NavLink to='/settings' />));
    });

    it('should render correctly', () => {
        const wrapper = shallow(<Footer />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
