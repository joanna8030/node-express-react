/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import * as types from '../src/constants/ActionTypes';
import { operation, modalControl, errorHandler } from '../src/reducers';

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
      const issue = { seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false };
      expect(operation({ issues: [] }, { type: types.AddRow, issue })).to.eql({ issues: [issue] });
    });
    it('should handle UpdateRow', () => {
      const state = {
        issues:
          [{ seq: 2, status: 'Open', category: 'cat1', title: 'title2', owner: 'Allen', priority: 'P2', isUpdate: false }]
      };
      const issue = { seq: 2, status: 'Close', category: 'cat', title: 'title', owner: 'Allen', priority: 'P', isUpdate: false };
      expect(operation(state, { type: types.UpdateRow, issue })).to.eql({ issues: [issue] });
    });
  });

  describe('modalControl', () => {
    it('should handle initialState', () => {
      const initialState = { showModal: false, title: 'New Issue', issue: {} };
      expect(modalControl(undefined, {})).to.eql(initialState);
    });
    it('should handle open modal', () => {
      const state = { showModal: false, title: 'New Issue', issue: {} };
      const action = { type: types.ShowModal, title: 'New Issue', issue: {} };
      expect(modalControl(state, action)).to.eql({ showModal: true, title: 'New Issue', issue: {} });
    });
    it('should handle close modal', () => {
      const state = { showModal: false };
      expect(modalControl(state, { type: types.CloseModal })).to.eql({ showModal: false });
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
  });
});
