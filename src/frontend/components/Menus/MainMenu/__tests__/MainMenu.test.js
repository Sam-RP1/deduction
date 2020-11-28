import React from 'react';

// Enzyme Imports
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Component Imports
import MainMenu from '../MainMenu';
import Title from '../../../UI/Title/Title';
import NavButton from '../../../UI/Buttons/NavButton/NavButton';

// Enzyme configuration
configure({ adapter: new Adapter() });

// Test cases
describe('<MainMenu /> | Component', () => {
    const dummyData = [
        { title: 'Create Game', route: '/creategame', function: () => console.log('[MAIN MENU BTN] create game') },
        { title: 'Join Game', route: '/joingame', function: () => console.log('[MAIN MENU BTN] join game') },
        { title: 'Rules', route: '/rules', function: () => console.log('[MAIN MENU BTN] rules') },
    ];

    it('should render <Title />', () => {
        const wrapper = shallow(<MainMenu />);
        expect(wrapper.find(<Title />));
    });

    it('should render one <NavButton />', () => {
        const wrapper = shallow(<MainMenu buttons={[dummyData[0]]} />);
        expect(wrapper.find(<NavButton />));
    });

    it('should render three <NavButton />', () => {
        const wrapper = shallow(<MainMenu buttons={dummyData} />);
        expect(wrapper.find('.main-menu__content').children().length).toEqual(3);
    });

    it('should render <Title /> and three <NavButton />', () => {
        const wrapper = shallow(<MainMenu buttons={dummyData} />);
        expect(wrapper.find(<Title />));
        expect(wrapper.find('.main-menu__content').children().length).toEqual(3);
    });

    it('should render correctly', () => {
        const wrapper = shallow(<MainMenu buttons={dummyData} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
