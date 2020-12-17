import React from 'react';
import PropTypes from 'prop-types';

import BackButton from '../UI/Buttons/BackButton/BackButton';

import './Header.scss';

const Header = () => {
    return (
        <header className='header'>
            <BackButton />
            <h1 className='header__title'>Deduction</h1>
        </header>
    );
};

Header.propTypes = {
    themeToggle: PropTypes.func,
};

export default Header;
