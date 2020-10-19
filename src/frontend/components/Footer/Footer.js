import React from 'react';

import '../../styles/root.scss';
import './Footer.scss';

const Footer = () => {
  return (
    <section className="footer container">
      <div>
      <div>
      <p>Toggle Dark Mode</p>
      <span>toggle element</span>
      </div>
      <i onClick={() => console.log("[BUTTON CLICK] open settings menu")} className="fas fa-cog"></i>
      </div>

      <div>
      <p>Developed by <a href="http://srenshawpanting.co.uk/"><u>SRP Designs</u></a></p>
      <p><a href=""><u>Donate here</u></a></p>
      </div>
    </section>
  )
}

export default Footer;
