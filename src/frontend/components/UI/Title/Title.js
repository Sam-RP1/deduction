import React from 'react';
import PropTypes from 'prop-types';

import './Title.scss';

const Title = (props) => {
    return <h1 className='title'>{props.title}</h1>;
};

Title.propTypes = {
    title: PropTypes.string,
};

Title.defaultProps = {
    title: 'Deduction',
};

export default Title;
