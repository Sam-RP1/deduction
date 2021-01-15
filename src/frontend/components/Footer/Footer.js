import React from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';

import Rules from './Rules';

import './Footer.scss';

const Footer = (props) => {
    return (
        <footer className='footer'>
            <Rules />

            <div className='footer__settings footer__settings--row'>
                <div className='footer__settings__rules-wrapper'>
                    <p>Rules & Help</p>
                    <i className='fas fa-question-circle'></i>
                </div>
                <div className='footer__settings__toggle-switch-wrapper'>
                    <p>Toggle Light Mode</p>
                    <ToggleSwitch function={props.themeToggle} />
                </div>
            </div>

            <div className='footer__info footer__info--row'>
                <p>
                    Developed by{' '}
                    <a target='_blank' rel='noreferrer' href='http://srenshawpanting.co.uk/'>
                        <u>Sam R-P</u>
                    </a>
                </p>
                <p>
                    <a target='_blank' rel='noreferrer' href='https://www.buymeacoffee.com/samrp'>
                        <u>Support Sam</u>
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
