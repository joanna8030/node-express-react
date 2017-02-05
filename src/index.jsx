import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory, Router } from 'react-router';
import reducer from './reducers';
import routes from './routes';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
