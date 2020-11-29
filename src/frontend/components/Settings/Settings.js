import React from 'react';

import Title from '../UI/Title/Title';

import './Settings.scss';

const Settings = () => {
    return (
        <div className='settings'>
            <div
                className='settings__btn'
                onClick={() => {
                    document.querySelector('.settings').style.display = 'none';
                }}
            >
                <i className='far fa-times-circle'></i>
                <p>Close</p>
            </div>
            <Title title={'Settings'} />
            <div className='settings__content'>
                <p>Coming soon...</p>
            </div>
        </div>
    );
};

export default Settings;
