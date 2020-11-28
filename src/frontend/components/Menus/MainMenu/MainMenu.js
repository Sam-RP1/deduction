import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Title from '../../UI/Title/Title';
import NavButton from '../../UI/Buttons/NavButton/NavButton';

// Styles
import './MainMenu.scss';

// Presentational Component
const MainMenu = (props) => {
    return (
        <section className='main-menu'>
            <Title title='Deduction' />
            <div className='main-menu__content'>
                {props.buttons.map((btn, i) => {
                    return <NavButton key={i} title={btn.title} route={btn.route} function={btn.function} />;
                })}
            </div>
        </section>
    );
};

MainMenu.propTypes = {
    buttons: PropTypes.array.isRequired,
};

MainMenu.defaultProps = {
    buttons: [{ title: 'Error', route: '/', function: () => console.log('[MAIN MENU BTN] error') }],
};

export default MainMenu;
