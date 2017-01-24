/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const mongoose = require('mongoose');
const PRODUCTION_DB_URI = require('./src/constants/uri').PRODUCTION_DB_URI;
const TEST_DB_URI = require('./src/constants/uri').TEST_DB_URI;

const dbUri = process.env.NODE_ENV === 'production' ? PRODUCTION_DB_URI : TEST_DB_URI;
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('connect'); });

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const CounterModel = mongoose.model('Counter', CounterSchema);

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
  CounterModel.findByIdAndUpdate({ _id: 'seq' }, { $inc: { seq: 1 } }, function(err, doc) {
    if (doc !== null) {
      that.seq = doc.seq;
      next();
    } else {
      const seqNumber = new CounterModel({ _id: 'seq', seq: 2 });
      seqNumber.save(seqNumber, (error, counter) => {
        that.seq = counter.seq - 1;
        next();
      });
    }
  });
});

const IssueModel = mongoose.model('Issues', Issue);
exports.IssueModel = IssueModel;
