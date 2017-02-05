/* eslint react/jsx-filename-extension:0 */
import React from 'react';
import { Route } from 'react-router';
import App from './containers/container';
import NewForm from './containers/new-issue';
import UpdateForm from './containers/update-issue';

module.exports = (
  <div>
    <Route path='/' component={App} />
    <Route path='new' component={NewForm} />
    <Route path='/update/:id' component={UpdateForm} />
  </div>
);
