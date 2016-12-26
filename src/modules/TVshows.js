import { Actions } from 'react-native-router-flux';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { find as findAPI } from 'mySeries/src/services/api';

// ACTION TYPES
export const actionTypes = {
  find: 'TVSHOWS.FIND',
  findSuccess: 'TVSHOWS.FIND_SUCCESS',
  findFail: 'TVSHOWS.FIND_FAIL',
};

// ACTION CREATOR
export function find(query) {
  return { type: actionTypes.find, query };
}

export function findSuccess(response) {
  return { type: actionTypes.findSuccess, response };
}

export function findFail(errorMsg) {
  return { type: actionTypes.findFail, error: errorMsg};
}

// REDUCERS
const initialState = {
  list: [],
  page: 1,
  total_page: 0,
  _metadata:{}
};



export function tvShowsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.findSuccess:
      return {
        list: action.response.results,
        page: action.response.page,
        totalPages: action.response.total_pages,
        _metadata: {
          success: true,
        }
      };
    case actionTypes.findFail:
      return {
        ...state,
        _metadata: { fail: true }
      };
      case actionTypes.find:
        return {
          ...state,
          _metadata: { fetching: true }
        };
    default:
      return state;
  }
}

// SAGAS
function* findSaga(action) {
  try {
    const response = yield call(findAPI, action.query);
    yield put(findSuccess(response));
  } catch (e) {
    yield put(findFail(e));
  }
}


export function* tvShowsSaga() {
  yield* [
    takeLatest(actionTypes.find, findSaga),
  ];
}
