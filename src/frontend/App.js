import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Container from './components/UI/Container/Container';
import Home from './containers/Home/Home';
import CreateGame from './containers/CreateGame/CreateGame';
import JoinGame from './containers/JoinGame/JoinGame';
import Game from './containers/Game/Game';
import Rules from './components/Menus/Rules/Rules';
import Settings from './components/Settings/Settings'; // eslint-disable-line
import BackButton from './components/UI/Buttons/BackButton/BackButton';
import Footer from './components/Footer/Footer';

import './styles/root.scss';

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        isDarkTheme ? setIsDarkTheme(false) : setIsDarkTheme(true);
        console.log('[THEME] toggled');
    };

    return (
        <div className={'theme ' + (isDarkTheme ? 'theme--dark' : 'theme--default')}>
            <BrowserRouter>
                <div className='base'>
                    <Route
                        render={({ location }) => {
                            return location.pathname !== '/' ? <BackButton /> : null;
                        }}
                    />
                    <Container opClasses={'container--center container--column'}>
                        <Route path='/game' component={Game} />
                        <Route path='/rules' component={Rules} />
                        <Route path='/joingame' component={JoinGame} />
                        <Route path='/creategame' component={CreateGame} />
                        <Route path='/' exact component={Home} />
                    </Container>
                    <Settings />
                    <Footer themeToggle={() => toggleTheme()} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
