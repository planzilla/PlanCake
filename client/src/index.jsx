import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import plancakeApp from './reducers';
import App from './App.jsx';
import store from './store';
// const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('app'));
