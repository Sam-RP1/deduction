import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';
import Help from '../Menus/Help/Help';

import './Footer.scss';

const Footer = (props) => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <footer className='footer'>
            {isHelpOpen === true ? <Help close={() => setIsHelpOpen(false)} /> : null}
            <div className='footer__settings footer__settings--row noselect'>
                <div className='footer__settings__help-wrapper' onClick={() => setIsHelpOpen(!isHelpOpen)}>
                    <p>Help & More</p>
                    <i className='fas fa-question-circle'></i>
                </div>
                <div className='footer__settings__toggle-switch-wrapper'>
                    <i className='fas fa-moon'></i>
                    <ToggleSwitch function={props.themeToggle} />
                    <i className='fas fa-sun'></i>
                </div>
            </div>
            <div className='footer__info footer__info--row noselect'>
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
