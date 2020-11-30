import React from 'react';

// Enzyme Imports
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Component Imports
import CreateGameMenu from '../CreateGameMenu';
import Title from '../../../UI/Title/Title';
import ToggleSwitch from '../../../UI/ToggleSwitch/ToggleSwitch';
import NavButton from '../../../UI/Buttons/NavButton/NavButton';

// Enzyme configuration
configure({ adapter: new Adapter() });

// Test cases
describe('<CreateGameMenu /> | Component', () => {
    const dummyData = [
        { id: 'eng-standard', title: 'english' },
        { id: 'test', title: 'test' },
    ];

    it('should render <Title />', () => {
        const wrapper = shallow(<CreateGameMenu />);
        expect(wrapper.find(<Title />));
    });

    it('should render <ToggleSwitch />', () => {
        const wrapper = shallow(<CreateGameMenu />);
        expect(wrapper.find(<ToggleSwitch />));
    });

    it('should render <NavButton />', () => {
        const wrapper = shallow(<CreateGameMenu />);
        expect(wrapper.find(<NavButton />));
    });

    it('should render <Title />, <ToggleSwitch /> and <NavButton />', () => {
        const wrapper = shallow(<CreateGameMenu />);
        expect(wrapper.find(<Title />));
        expect(wrapper.find(<ToggleSwitch />));
        expect(wrapper.find(<NavButton />));
    });

    it('should render one selection brick', () => {
        const wrapper = shallow(<CreateGameMenu wordGroups={[dummyData[0]]} />);
        expect(wrapper.find('.setup-menu__option__selection__container').children().length).toEqual(1);
    });

    it('should render two selection bricks', () => {
        const wrapper = shallow(<CreateGameMenu wordGroups={dummyData} />);
        expect(wrapper.find('.setup-menu__option__selection__container').children().length).toEqual(2);
    });

    it('should render correctly', () => {
        const wrapper = shallow(<CreateGameMenu />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
