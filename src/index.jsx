import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory, Router, Route } from 'react-router';
import reducer from './reducers';
import App from './containers/container';
import NewForm from './containers/new-issue';
import UpdateForm from './containers/update-issue';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/new' component={NewForm} />
      <Route path='/update/:id' component={UpdateForm} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
