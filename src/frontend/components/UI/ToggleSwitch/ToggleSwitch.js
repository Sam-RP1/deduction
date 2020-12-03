import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './ToggleSwitch.scss';

const ToggleSwitch = (props) => {
    const [isToggled, setToggleState] = useState(false);

    const toggle = () => {
        isToggled ? setToggleState(false) : setToggleState(true);
    };

    useEffect(() => {
        if (props.toggle) {
            setToggleState(true);
        }
    }, []);

    return (
        <div
            onClick={() => {
                props.function();
                toggle();
            }}
            className={'toggle-switch ' + (isToggled ? 'active' : '')}
        >
            <span></span>
        </div>
    );
};

ToggleSwitch.propTypes = {
    toggle: PropTypes.bool,
    function: PropTypes.func.isRequired,
};

ToggleSwitch.defaultProps = {
    toggle: false,
    function: () => console.log('[TOGGLE SWITCH] undefined toggle switch function'),
};

export default ToggleSwitch;
