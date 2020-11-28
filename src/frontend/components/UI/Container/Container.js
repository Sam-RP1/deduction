import React from "react";
import PropTypes from 'prop-types';

import './Container.scss'

const Container = (props) => {
  return (
    <div className={"container " + props.opClasses}>
    {props.children}
    </div>
  );
}

Container.propTypes = {
  opClasses: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Container;
