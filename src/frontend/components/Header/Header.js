import React from 'react';
import PropTypes from 'prop-types';

import BackButton from '../UI/Buttons/BackButton/BackButton';

import './Header.scss';

const Header = (props) => {
    return (
        <header className='header'>
            <BackButton title={props.btnTitle} />
            <h1 className='header__title'>Deduction</h1>
        </header>
    );
};

Header.propTypes = {
    btnTitle: PropTypes.string,
};

export default Header;
