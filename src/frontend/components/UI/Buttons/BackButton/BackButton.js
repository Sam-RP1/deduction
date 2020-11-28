import React from 'react';
import PropTypes from 'prop-types';

import './BackButton.scss';

const BackButton = (props) => {
    return (
        <div
            className={'back-btn ' + props.opClasses}
            onClick={() => {
                window.history.back();
            }}
        >
            <i className='fas fa-long-arrow-alt-left'></i>
            <p>{props.title}</p>
        </div>
    );
};

BackButton.propTypes = {
    title: PropTypes.string.isRequired,
    opClasses: PropTypes.string,
};

BackButton.defaultProps = {
    title: 'Back',
    opClasses: '',
};

export default BackButton;
