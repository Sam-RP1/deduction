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
                    return <NavButton key={i} title={btn.title} route={btn.route} />;
                })}
            </div>
        </section>
    );
};

Home.propTypes = {
    buttons: PropTypes.array,
};

Home.defaultProps = {};

export default Home;
