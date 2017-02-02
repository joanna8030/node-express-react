import { API_PORT } from '../../config';

exports.PRODUCTION_API_URI = 'http://localhost:' + API_PORT + '/issues/';
exports.PRODUCTION_DB_URI = 'mongodb://127.0.0.1:27017/Issues';
exports.TEST_DB_URI = 'mongodb://127.0.0.1:27017/test';
