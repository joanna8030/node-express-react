/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const mongoose = require('mongoose');
const ProductionDBUri = require('./src/constants/uri').ProductionDBUri;
const TestDBUri = require('./src/constants/uri').TestDBUri;

const dbUri = process.env.NODE_ENV === 'production' ? ProductionDBUri : TestDBUri;
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('connect'); });

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const counter = mongoose.model('Counter', CounterSchema, 'Counter');

const Issue = new Schema({
  seq: Number,
  status: String,
  category: String,
  title: String,
  owner: String,
  priority: String,
  isUpdate: Boolean,
  timeStamp: Date
});

Issue.pre('save', function(next) {
  const that = this;
  counter.findByIdAndUpdate({ _id: 'seq' }, { $inc: { seq: 1 } }, function(err, doc) {
    that.seq = doc.seq;
    next();
  });
});

const IssueModel = mongoose.model('Issues', Issue);
exports.IssueModel = IssueModel;
