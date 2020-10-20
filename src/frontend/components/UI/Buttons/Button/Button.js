import React from 'react';
import PropTypes from 'prop-types';

import '../Button.scss';

const Button = (props) => {
  return (
    <div className="btn" onClick={() => {props.function()}}>
    <p>{props.title}</p>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  function: PropTypes.func.isRequired
}

Button.defaultProps = {
  title: "UNDEFINED",
  function: () => console.log("[BUTTON] undefined button function")
};

export default Button;
