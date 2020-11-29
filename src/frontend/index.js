import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Styles
import './styles/root.scss';

// Imports
import App from './App';
import reducer from './store/reducer.js';

// Redux Store
const store = createStore(reducer);

// Construct App
const app = (
  <Provider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </Provider>
)

// Render
ReactDOM.render(app, document.getElementById('root'));
