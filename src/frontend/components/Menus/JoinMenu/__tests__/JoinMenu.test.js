import React from 'react';

// Enzyme Imports
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Component Imports
import JoinMenu from '../JoinMenu';
import Title from '../../../UI/Title/Title';
import NavButton from '../../../UI/Buttons/NavButton/NavButton';

// Enzyme configuration
configure({ adapter: new Adapter() });

// Test cases
describe('<JoinMenu /> | Component', () => {
    it('should render <Title />', () => {
        const wrapper = shallow(<JoinMenu />);
        expect(wrapper.find(<Title />));
    });

    it('should render <NavButton />', () => {
        const wrapper = shallow(<JoinMenu />);
        expect(wrapper.find(<NavButton />));
    });

    it('should render <Title /> and <NavButton />', () => {
        const wrapper = shallow(<JoinMenu />);
        expect(wrapper.find(<Title />));
        expect(wrapper.find(<NavButton />));
    });

    it('should render correctly', () => {
        const wrapper = shallow(<JoinMenu />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
