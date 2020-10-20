import React from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';

import '../../styles/root.scss';
import './Footer.scss';

const Footer = (props) => {
  return (
    <section className="footer">
      <div className="footer__row footer__settings">
        <div className="footer__settings__toggle-switch-wrapper">
          <p>Toggle Dark Mode</p>
          <ToggleSwitch function={props.themeToggle} />
        </div>
      <i onClick={() => console.log("[BUTTON CLICK] open settings menu")} className="fas fa-cog"></i>
      </div>

      <div className="footer__row footer__info">
        <p>Developed by <a href="http://srenshawpanting.co.uk/"><u>SRP Designs</u></a></p>
        <p><a href=""><u>Donate here</u></a></p>
      </div>
    </section>
  )
}

Footer.propTypes = {
  themeToggle: PropTypes.func
}

export default Footer;
