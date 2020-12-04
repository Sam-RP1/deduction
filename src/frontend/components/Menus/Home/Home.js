import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Title from '../../UI/Title/Title';
import NavButton from '../../UI/Buttons/NavButton/NavButton';

// Styles
import './Home.scss';

// Presentational Component
const Home = (props) => {
    return (
        <section className='home'>
            <Title title='Deduction' />
            <div className='home__content'>
                {props.buttons.map((btn, i) => {
                    return <NavButton key={i} title={btn.title} route={btn.route} function={btn.function} />;
                })}
            </div>
        </section>
    );
};

Home.propTypes = {
    buttons: PropTypes.array.isRequired,
};

Home.defaultProps = {
    buttons: [{ title: 'Error', route: '/', function: () => console.log('[HOME BTN] error') }],
};

export default Home;
