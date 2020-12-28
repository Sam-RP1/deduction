import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import useSocket from './hooks/useSocket';

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
    const { socketRef } = useSocket();

    const toggleTheme = () => {
        const themeElem = document.getElementById('theme');
        themeElem.classList.toggle('theme--dark');
        themeElem.classList.toggle('theme--default');
    };

    return (
        <div id='theme' className='theme theme--dark'>
            <BrowserRouter>
                <div className='base'>
                    <Route
                        render={({ location }) => {
                            return location.pathname !== '/' ? <Header /> : null;
                        }}
                    />
                    <Container opClasses={'container--center container--column'}>
                        <Route path='/game' component={() => <Game socketRef={socketRef} />} />
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
