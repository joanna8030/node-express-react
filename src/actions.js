import fetch from 'isomorphic-fetch';
import * as types from './constants/actionTypes';
import { PRODUCTION_API_URI } from './constants/uri';

const fetchUrl = PRODUCTION_API_URI;
export const handleDropRow = seq => ({ type: types.DeleteRow, seq });
export const handleAddRow = issue => ({ type: types.AddRow, issue });
export const handleUpdateRow = issue => ({ type: types.UpdateRow, issue });
export const handleShowModal = (title, issue) => ({ type: types.ShowModal, title, issue });
export const handleCloseModal = () => ({ type: types.CloseModal });
export const fetchDataSuccess = issues => ({ type: types.FetchSuccess, issues });
export const fetchDataFailed = msg => ({ type: types.FetchFailed, msg });
export const addDataFailed = msg => ({ type: types.InsertFailed, msg });
export const updateDataFailed = msg => ({ type: types.UpdateFailed, msg });
export const dropDataFailed = msg => ({ type: types.DropFailed, msg });
export const fetchData = () => (
  dispatch => (
    fetch(fetchUrl)
    .then(res => (
      res.json().then(
        (data) => {
          if (data.isSuccess) {
            dispatch(fetchDataSuccess(data.issues));
          } else {
            dispatch(fetchDataFailed(data.err));
          }
        }
      )
    ))
  )
);
export const addRow = issue => (
  dispatch => (
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ issue })
    })
    .then(res => (
      res.json().then(
        (data) => {
          if (data.isSuccess) {
            dispatch(handleAddRow(data.issue));
          } else {
            dispatch(addDataFailed(data.err));
          }
        }
      )
    ))
  )
);
export const updateRow = issue => (
  dispatch => (
    fetch(fetchUrl + issue.seq, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ issue })
    })
    .then(res => (
      res.json().then(
        (data) => {
          if (data.isSuccess) {
            dispatch(handleUpdateRow(data.issue));
          } else {
            dispatch(updateDataFailed(data.err));
          }
        }
      )
    ))
  )
);
export const dropRow = seq => (
  dispatch => (
    fetch(fetchUrl + seq, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => (
      res.json().then(
        (data) => {
          if (data.isSuccess) {
            dispatch(handleDropRow(data.seq));
          } else {
            dispatch(dropDataFailed(data.err));
          }
        }
      )
    ))
  )
);
