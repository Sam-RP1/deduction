import React from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';

import './Footer.scss';

const Footer = (props) => {
    return (
        <footer className='footer'>
            <div className='footer__settings footer__settings--row'>
                <div className='footer__settings__toggle-switch-wrapper'>
                    <p>Toggle Light Mode</p>
                    <ToggleSwitch function={props.themeToggle} />
                </div>
                <i
                    className='fas fa-cog'
                    onClick={() => (document.querySelector('.settings').style.display = 'flex')}
                ></i>
            </div>

            <div className='footer__info footer__info--row'>
                <p>
                    Developed by{' '}
                    <a href='http://srenshawpanting.co.uk/'>
                        <u>SRP Designs</u>
                    </a>
                </p>
                <p>
                    <a href=''>
                        <u>Donate here</u>
                    </a>
                </p>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    themeToggle: PropTypes.func,
};

export default Footer;
