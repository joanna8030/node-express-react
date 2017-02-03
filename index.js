const express = require('express');
const DB = require('./db').IssueModel;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/new', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/update/:id', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
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
