import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Imports
import App from './App';
import playerReducer from './store/reducers/player';
import createGameReducer from './store/reducers/createGame';
import gameReducer from './store/reducers/game';

// Styles
import './styles/root.scss';

// Reducers
const rootReducer = combineReducers({
    player: playerReducer,
    cgr: createGameReducer,
    game: gameReducer,
});

// Redux Store
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, enhancer);

// Construct App
const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

// Render
ReactDOM.render(app, document.getElementById('root'));
