import React from "react";
import PropTypes from 'prop-types';

import './ContentContainer.scss'

const ContentContainer = (props) => {
  return (
    <div className={"content-container " + props.opClasses}>
    {props.children}
    </div>
  );
}

ContentContainer.propTypes = {
  opClasses: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default ContentContainer;
