import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// Imports
import App from './App';
import createGameMenu from './store/reducers/createGameMenu';
import reducer from './store/reducers/reducer.js';

// Styles
import './styles/root.scss';

const rootReducer = combineReducers({
    createGameMenu: createGameMenu,
    reducer: reducer,
});

// Redux Store
const store = createStore(rootReducer);

// Construct App
const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

// Render
ReactDOM.render(app, document.getElementById('root'));
