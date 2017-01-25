/* eslint no-confusing-arrow: 0 */
import { combineReducers } from 'redux';
import * as types from './constants/actionTypes';

export const operation = (state = {}, action) => {
  switch (action.type) {
    case types.FetchSuccess:
      return {
        ...state,
        issues: action.issues
      };
    case types.DeleteRow:
      return {
        ...state,
        issues: state.issues.filter(issue => issue.seq !== action.seq)
      };
    case types.AddRow:
      return {
        ...state,
        issues: [
          ...state.issues,
          {
            ...action.issue
          }
        ]
      };
    case types.UpdateRow:
      return {
        ...state,
        issues: state.issues.map(issue =>
          issue.seq === action.issue.seq ?
            action.issue : issue)
      };
    default:
      return state;
  }
};

export const issue = (state = {}, action) => {
  switch (action.type) {
    case types.FetchIssueSuccess:
      return action.issue;
    default:
      return state;
  }
};

export const errorHandler = (state = '', action) => {
  switch (action.type) {
    case types.DropFailed:
      return action.msg;
    case types.FetchFailed:
      return action.msg;
    case types.InsertFailed:
      return action.msg;
    case types.UpdateFailed:
      return action.msg;
    case types.FetchIssueFailed:
      return action.msg;
    default:
      return '';
  }
};

const Reducers = combineReducers({
  operation,
  issue,
  errorHandler
});

export default Reducers;
