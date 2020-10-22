import React from 'react';
import PropTypes from 'prop-types';

import '../Button.scss';

const Button = (props) => {
  return (
    <div className={"btn " + props.opClasses} onClick={() => {props.function()}}>
    <p>{props.title}</p>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  function: PropTypes.func.isRequired,
  opClasses: PropTypes.string
}

Button.defaultProps = {
  title: "UNDEFINED",
  function: () => console.log("[BUTTON] undefined button function"),
  opClasses: ""
};

export default Button;
