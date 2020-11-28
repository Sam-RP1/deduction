import React from 'react';

import Title from '../../UI/Title/Title';
import NavButton from '../../UI/Buttons/NavButton/NavButton';

import './JoinMenu.scss';

const JoinMenu = () => {
    return (
        <section className='join-menu'>
            <Title title='Deduction' />

            <div className='join-menu__content'>
                <h3>Enter Join Link:</h3>
                <input />
            </div>

            <NavButton title={'Join!'} route={'/game'} />
        </section>
    );
};

export default JoinMenu;
