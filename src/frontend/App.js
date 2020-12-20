import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import useGame from './containers/useGame';

import Header from './components/Header/Header';
import Container from './components/UI/Container/Container';
import Home from './containers/Home/Home';
import CreateGame from './containers/CreateGame/CreateGame';
import JoinGame from './containers/JoinGame/JoinGame';
import Game from './containers/Game/Game';
import Settings from './components/Settings/Settings'; // eslint-disable-line

import Footer from './components/Footer/Footer';

import './styles/root.scss';

const App = () => {
    const lobbyId = 'newIdMeme';
    const { sendUpdate } = useGame(lobbyId); //eslint-disable-line
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
                            return location.pathname !== '/' ? <Header /> : null;
                        }}
                    />
                    <Container opClasses={'container--center container--column'}>
                        <Route path='/game' component={Game} />
                        <Route path='/joingame' component={JoinGame} />
                        <Route path='/creategame' component={() => <CreateGame sendUpdate={sendUpdate} />} />
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
