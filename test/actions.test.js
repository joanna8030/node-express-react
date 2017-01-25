/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions';
import DB from '../db';

const expect = chai.expect;
chai.use(chaiHttp);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('sync action', () => {
    it('handleDropRow should create DELETE_ROW action', () => {
      expect(actions.handleDropRow(1)).to.eql({ type: types.DeleteRow, seq: 1 });
    });

    it('handleAddRow should create ADD_ROW action', () => {
      const issue = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
      expect(actions.handleAddRow(issue)).to.eql({ type: types.AddRow, issue: issue });
    });

    it('handleUpdateRow should create UPDATE_ROW action', () => {
      const issue = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
      expect(actions.handleUpdateRow(issue)).to.eql({ type: types.UpdateRow, issue: issue });
    });

    it('handleShowModal should create SHOW_MODAL action', () => {
      const issue = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
      const title = 'Update';
      expect(actions.handleShowModal(title, issue)).to.eql({ type: types.ShowModal, title, issue });
    });

    it('handleCloseModal should create CLOSE_MODAL action', () => {
      expect(actions.handleCloseModal()).to.eql({ type: types.CloseModal });
    });

    it('fetchDataSuccess should create FETCH_SUCCESS action', () => {
      const issues = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
      expect(actions.fetchDataSuccess(issues)).to.eql({ type: types.FetchSuccess, issues });
    });
  });
  describe('async actions', () => {
    let stub;

    afterEach(() => {
      stub.restore();
    });

    it('fetchData should create fetchDataSuccess when fetching data has been done', () => {
      stub = sinon.stub(DB.IssueModel, 'find').yields(null, []);
      const expectedActions = [{ type: types.FetchSuccess, issues: [] }];
      const store = mockStore({ issues: [] });
      return store.dispatch(actions.fetchData())
        .then(() => {
          expect(DB.IssueModel.find).have.been.calledOnce;
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('fetchIssue should create fetchIssueSuccess when fetching data has been done', () => {
      const issue = { seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false };
      stub = sinon.stub(DB.IssueModel, 'find').yields(null, [issue]);
      const expectedActions = [{ type: types.FetchIssueSuccess, issue }];
      const store = mockStore({ issue: {} });
      return store.dispatch(actions.fetchIssue())
        .then(() => {
          expect(DB.IssueModel.find).have.been.calledOnce;
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('addRow should create handleAddRow after insert data', () => {
      const issue = { status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false };
      stub = sinon.stub(DB.IssueModel, 'create').yields(null, issue);
      const expectedActions = [{ type: types.AddRow, issue }];
      const store = mockStore({ issues: [] });
      return store.dispatch(actions.addRow(issue))
        .then(() => {
          expect(DB.IssueModel.create).to.have.been.calledOnce;
          expect(store.getActions()[0].type).to.deep.equal(expectedActions[0].type);
          expect(store.getActions()[0].issue.status).to.deep.equal(expectedActions[0].issue.status);
          expect(store.getActions()[0].issue.category).to.deep.equal(expectedActions[0].issue.category);
          expect(store.getActions()[0].issue.title).to.deep.equal(expectedActions[0].issue.title);
          expect(store.getActions()[0].issue.owner).to.deep.equal(expectedActions[0].issue.owner);
          expect(store.getActions()[0].issue.priority).to.deep.equal(expectedActions[0].issue.priority);
          expect(store.getActions()[0].issue.isUpdate).to.deep.equal(expectedActions[0].issue.isUpdate);
        });
    });

    it('updateRow should create handleUpdateRow after update data', () => {
      const issue = { seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false };
      const updateIssue = { status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: true };
      stub = sinon.stub(DB.IssueModel, 'findOneAndUpdate').yields(null, updateIssue);
      const expectedActions = [{ type: types.UpdateRow, issue: updateIssue }];
      const store = mockStore({ issues: [{ seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false }] });
      return store.dispatch(actions.updateRow(issue))
        .then(() => {
          expect(DB.IssueModel.findOneAndUpdate).to.have.been.calledOnce;
          expect(store.getActions()[0].type).to.deep.equal(expectedActions[0].type);
          expect(store.getActions()[0].seq).to.deep.equal(expectedActions[0].seq);
          expect(store.getActions()[0].category).to.deep.equal(expectedActions[0].category);
          expect(store.getActions()[0].title).to.deep.equal(expectedActions[0].title);
          expect(store.getActions()[0].owner).to.deep.equal(expectedActions[0].owner);
          expect(store.getActions()[0].priority).to.deep.equal(expectedActions[0].priority);
          expect(store.getActions()[0].isUpdate).to.deep.equal(expectedActions[0].isUpdate);
        });
    });

    it('deleteRow should create handleDropRow after delete data', () => {
      const issue = { seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: true };
      stub = sinon.stub(DB.IssueModel, 'findOneAndUpdate').yields(null, { seq: issue.seq });
      const expectedActions = [{ type: types.DeleteRow, seq: issue.seq }];
      const store = mockStore({ issues: [{ seq: 1, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: true }] });
      return store.dispatch(actions.dropRow(issue.seq))
        .then(() => {
          expect(DB.IssueModel.findOneAndUpdate).to.have.been.calledOnce;
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });
});
