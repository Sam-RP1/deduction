import React from 'react';

import { shallow } from 'enzyme';

import App from './App';

// Will have more added to it such as props
/**
 * Factory function to create a shallow wrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 * Factory function to find an element in a given wrapper with the 'data-test' attribute containing val.
 * @function findByTestAttr
 * @param {DOM} wrapper - Shallow wrapper containing the DOM.
 * @param {string} val - Attribute value.
 * @returns {} find out what it returns
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}]`);

test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});
