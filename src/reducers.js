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

const initialState = { showModal: false, title: 'New Issue', issue: {} };

export const modalControl = (state = initialState, action) => {
  switch (action.type) {
    case types.ShowModal:
      return { ...state, showModal: true, title: action.title, issue: action.issue };
    case types.CloseModal:
    case types.AddRow:
    case types.UpdateRow:
      return { ...state, showModal: false };
    default:
      return state;
  }
};

export const errorHandler = (state = '', action) => {
  switch (action.type) {
    case types.DropFailed:
    case types.FetchFailed:
    case types.InsertFailed:
    case types.UpdateFailed:
      return action.msg;
    default:
      return '';
  }
};

const Reducers = combineReducers({
  operation,
  modalControl,
  errorHandler
});

export default Reducers;
