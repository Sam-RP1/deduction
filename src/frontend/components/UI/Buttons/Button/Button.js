import React from 'react';
import PropTypes from 'prop-types';

import '../Button.scss';

const Button = (props) => {
    return (
        <button
            className={'btn ' + props.opClasses}
            onClick={() => {
                props.function();
            }}
        >
            {props.title}
            {props.opElem}
        </button>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    function: PropTypes.func.isRequired,
    opClasses: PropTypes.string,
    opElem: PropTypes.element,
};

Button.defaultProps = {
    title: 'UNDEFINED',
    function: () => console.log('[BUTTON] undefined button function'),
};

export default Button;
