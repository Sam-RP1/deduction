import React from 'react';

import Title from '../UI/Title/Title';

import './Settings.scss';

const Settings = () => {
    return (
        <div className='settings'>
            <div className='settings__content'>
                <div
                    className='settings__content__btn'
                    onClick={() => {
                        document.querySelector('.settings').style.display = 'none';
                    }}
                >
                    <i className='far fa-times-circle'></i>
                    <p>Close</p>
                </div>
                <div className='settings__content__options'>
                    <Title title={'Settings'} />
                    <p>Coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
