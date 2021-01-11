import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import '../Button.scss';

const NavButton = (props) => {
    return (
        <NavLink to={props.route} exact={true}>
            <button className={'btn ' + props.opClasses}>{props.title}</button>
        </NavLink>
    );
};

NavButton.propTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    opClasses: PropTypes.string,
};

NavButton.defaultProps = {
    title: 'UNDEFINED',
    route: '/',
    opClasses: '',
};

export default NavButton;
