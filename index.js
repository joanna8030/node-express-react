/* eslint react/jsx-filename-extension:0 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import reducer from './src/reducers';
import { IssueModel as DB } from './db';
import routes from './src/routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

function renderFullPage(html, preloadedState) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Issue Tracker</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
  </head>
  <body>
      <h1>Issue Tracker</h1>
      <div id="root">${html}</div>
      <script src="/bundle.js"></script>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
  </body>
  </html>
    `;
}

app.get('/new|update/:id', (req, res) => {
  const store = createStore(reducer, applyMiddleware(thunk));
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    );
    const preloadedState = store.getState();
    res.send(renderFullPage(appHtml, preloadedState));
  });
});

app.get('/issues', function(req, res) {
  DB.find({ timeStamp: null }, function(err, docs) {
    if (err) res.json([{ isSuccess: false, err: err.message }]);
    res.json({ issues: docs, isSuccess: true });
  });
});

app.get('/issues/:issue_seq', function(req, res) {
  DB.find({ seq: req.params.issue_seq }, function(err, doc) {
    if (err) res.json({ isSuccess: false, err: err.message });
    res.json({ issue: doc[0], isSuccess: true });
  });
});

app.post('/issues', function(req, res) {
  DB.create(req.body.issue, function(err, doc) {
    if (err) res.json({ isSuccess: false, err: err.message });
    res.json({ issue: doc, isSuccess: true });
  });
});

app.put('/issues/:issue_id', function(req, res) {
  DB.findOneAndUpdate({ seq: req.params.issue_id }, req.body.issue, { new: true }, function(err, doc) {
    if (doc === null) {
      res.json({ isSuccess: false, err: 'Error: Cannot find issue with ' + req.params.issue_id });
    } else {
      res.json({ issue: doc, isSuccess: true });
    }
  });
});

app.delete('/issues/:issue_id', function(req, res) {
  DB.findOneAndUpdate({ seq: req.params.issue_id }, { timeStamp: new Date() }, function(err, doc) {
    if (doc === null) {
      res.json({ isSuccess: false, err: 'Error: Cannot find issue with ' + req.params.issue_id });
    } else {
      res.json({ seq: doc.seq, isSuccess: true });
    }
  });
});

app.listen(process.env.PORT || '3000', function() {
  console.log('application listening on port ', this.address().port);
});

module.exports = app;
