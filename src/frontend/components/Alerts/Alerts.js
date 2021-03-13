import React from 'react';
// import PropTypes from 'prop-types';

import './Alerts.scss';

const Alerts = () => {
    return (
        <div className='alerts'>
            <div className='alerts__notification--error'>
                <div className='alerts__notification__content'>
                    <h4>Error</h4>
                    <p>Please fix it.</p>
                </div>
                <div className='alerts__notification__timer'></div>
                <span className='alerts__notification__close'>&#10005;</span>
            </div>

            <div className='alerts__notification--success'>
                <div className='alerts__notification__content'>
                    <h4>Success</h4>
                    <p>Please see me.</p>
                </div>
                <div className='alerts__notification__timer'></div>
                <span className='alerts__notification__close'>&#10005;</span>
            </div>
        </div>
    );
};

Alerts.propTypes = {};

export default Alerts;
