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

/**
 * Factory function to create a shallow wrapper for the App component.
 * @function setup
 * @param {object} props - React props.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
    return shallow(<CreateGameMenu {...props} />);
};

// Test cases
describe('<CreateGameMenu /> | Component', () => {
    // should be wrapper not component
    let component;
    // trying before each
    beforeEach(() => {
        component = setup();
    });

    // trying test over it
    test('should render <Title />', () => {
        expect(component.find(<Title />));
    });

    it('should render <ToggleSwitch />', () => {
        expect(component.find(<ToggleSwitch />));
    });

    it('should render <NavButton />', () => {
        expect(component.find(<NavButton />));
    });
});

describe('<CreateGameMenu {...props} /> | Component', () => {
    const dummyData = [
        { id: 'eng-standard', title: 'english' },
        { id: 'test', title: 'test' },
    ];

    it('should render one selection brick', () => {
        const component = setup({ wordGroups: [dummyData[0]] });
        expect(component.find('.setup-menu__option__selection__container').children().length).toEqual(1);
    });

    it('should render two selection bricks', () => {
        const component = setup({ wordGroups: { dummyData } });
        expect(component.find('.setup-menu__option__selection__container').children().length).toEqual(2);
    });
});
