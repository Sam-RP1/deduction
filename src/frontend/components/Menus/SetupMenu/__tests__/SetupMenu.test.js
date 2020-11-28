import React from 'react';

// Enzyme Imports
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Component Imports
import SetupMenu from '../SetupMenu';
import Title from '../../../UI/Title/Title';
import ToggleSwitch from '../../../UI/ToggleSwitch/ToggleSwitch';
import NavButton from '../../../UI/Buttons/NavButton/NavButton';

// Enzyme configuration
configure({ adapter: new Adapter() });

// Test cases
describe('<SetupMenu /> | Component', () => {
    const dummyData = [
        { id: 'eng-standard', title: 'english' },
        { id: 'test', title: 'test' },
    ];

    it('should render <Title />', () => {
        const wrapper = shallow(<SetupMenu />);
        expect(wrapper.find(<Title />));
    });

    it('should render <ToggleSwitch />', () => {
        const wrapper = shallow(<SetupMenu />);
        expect(wrapper.find(<ToggleSwitch />));
    });

    it('should render <NavButton />', () => {
        const wrapper = shallow(<SetupMenu />);
        expect(wrapper.find(<NavButton />));
    });

    it('should render <Title />, <ToggleSwitch /> and <NavButton />', () => {
        const wrapper = shallow(<SetupMenu />);
        expect(wrapper.find(<Title />));
        expect(wrapper.find(<ToggleSwitch />));
        expect(wrapper.find(<NavButton />));
    });

    it('should render one selection brick', () => {
        const wrapper = shallow(<SetupMenu wordGroups={[dummyData[0]]} />);
        expect(wrapper.find('.setup-menu__option__selection__container').children().length).toEqual(1);
    });

    it('should render two selection bricks', () => {
        const wrapper = shallow(<SetupMenu wordGroups={dummyData} />);
        expect(wrapper.find('.setup-menu__option__selection__container').children().length).toEqual(2);
    });

    it('should render correctly', () => {
        const wrapper = shallow(<SetupMenu />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
