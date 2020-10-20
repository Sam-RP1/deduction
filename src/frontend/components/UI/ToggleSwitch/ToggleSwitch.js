import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ToggleSwitch.scss';

const ToggleSwitch = (props) => {
  const [isToggled, setToggleState] = useState(false);

  const toggle = () => {
    isToggled ? setToggleState(false) : setToggleState(true);
  }

  return (
    <div onClick={() => {props.function(); toggle();}} className={"toggle-switch " + (isToggled ? "active" : "")}>
      <span></span>
    </div>
  )
}

ToggleSwitch.propTypes = {
  function: PropTypes.func.isRequired
}

ToggleSwitch.defaultProps = {
  function: () => console.log("[TOGGLE SWITCH] undefined toggle switch function")
};

export default ToggleSwitch;
