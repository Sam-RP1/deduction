import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Styles
import './styles/root.scss';

// Imports
import App from './App';
import reducer from './store/reducer';

// Redux Store
const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
