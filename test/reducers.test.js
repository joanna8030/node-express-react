/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import * as types from '../src/constants/ActionTypes';
import { operation, issue, errorHandler } from '../src/reducers';

const expect = chai.expect;

describe('reducers', () => {
  describe('operation', () => {
    it('should handle initial state', () => {
      expect(operation(undefined, {})).to.eql({});
    });
    it('should handle fetch data success', () => {
      expect(operation({}, { type: types.FetchSuccess, issues: [] })).to.eql({ issues: [] });
    });
    it('should handle DeleteRow', () => {
      const state = {
        issues:
          [{ seq: 1, status: 'Open', category: 'cat1', title: 'title1', owner: 'Allen', priority: 'P1', isUpdate: false }]
      };
      expect(operation(state, { type: types.DeleteRow, seq: 1 })).to.eql({ issues: [] });
    });
    it('should handle AddRow', () => {
      const testIssue = { seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false };
      expect(operation({ issues: [] }, { type: types.AddRow, issue: testIssue })).to.eql({ issues: [testIssue] });
    });
    it('should handle UpdateRow', () => {
      const state = {
        issues:
          [{ seq: 2, status: 'Open', category: 'cat1', title: 'title2', owner: 'Allen', priority: 'P2', isUpdate: false }]
      };
      const updateIssue = { seq: 2, status: 'Close', category: 'cat', title: 'title', owner: 'Allen', priority: 'P', isUpdate: false };
      expect(operation(state, { type: types.UpdateRow, issue: updateIssue })).to.eql({ issues: [updateIssue] });
    });
  });

  describe('issue', () => {
    it('should handle fetch issue success', () => {
      const Issue = { seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false };
      expect(issue({}, { type: types.FetchIssueSuccess, issue: Issue })).to.eql(Issue);
    });
  });

  describe('errorHandler', () => {
    it('should handle fetch data failed', () => {
      expect(errorHandler('', { type: types.FetchFailed, msg: 'fetch data failed' })).to.eql('fetch data failed');
    });
    it('should handle drop data failed', () => {
      expect(errorHandler('', { type: types.DropFailed, msg: 'drop data failed' })).to.eql('drop data failed');
    });
    it('should handle insert data failed', () => {
      expect(errorHandler('', { type: types.InsertFailed, msg: 'insert data failed' })).to.eql('insert data failed');
    });
    it('should handle update data failed', () => {
      expect(errorHandler('', { type: types.FetchFailed, msg: 'update data failed' })).to.eql('update data failed');
    });
    it('should handle get data by seq failed', () => {
      expect(errorHandler('', { type: types.FetchIssueFailed, msg: 'get issue failed' })).to.eql('get issue failed');
    });
  });
});
