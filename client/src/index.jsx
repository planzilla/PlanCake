import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import plancakeApp from './reducers';
import App from './App.jsx';
import store from './store';
// const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));