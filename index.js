const express = require('express');
const DB = require('./db').IssueModel;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/issues', function(req, res) {
  DB.find({ timeStamp: null }, function(err, docs) {
    if (err) res.json([{}]);
    res.json(docs);
  });
});

app.post('/issues', function(req, res) {
  DB.create(req.body.issue, function(err, docs) {
    if (err) res.json({});
    res.json(docs);
  });
});

app.put('/issues/:issue_id', function(req, res) {
  DB.findOneAndUpdate({ seq: req.params.issue_id }, req.body.issue, { new: true }, function(err, doc) {
    if (err) res.json({});
    res.json(doc);
  });
});

app.delete('/issues/:issue_id', function(req, res) {
  DB.findOneAndUpdate({ seq: req.params.issue_id }, { timeStamp: new Date() }, function(err, doc) {
    if (err) res.json({});
    res.json(doc.seq);
  });
});

app.listen(3000, function() {
  console.log('application listening on port 3000!');
});

module.exports = app;
