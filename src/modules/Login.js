import { Actions } from 'react-native-router-flux';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

// ACTION TYPES
export const actionTypes = {
  login: 'USER.LOGIN',
  updateUsername: 'LOGIN.UPDATE_USERNAME',
  updatePassword: 'LOGIN.UPDATE_PASSWORD',
  loginSuccess: 'USER.LOGIN_SUCCESS',
  loginFail: 'USER.LOGIN_FAIL',
};

// ACTION CREATOR
export function login() {
  return { type: actionTypes.login };
}

export function loginSuccess() {
  return { type: actionTypes.loginSuccess };
}

export function loginFail(errorMsg) {
  return { type: actionTypes.loginFail, error: errorMsg};
}

export function updateUsername(username) {
  return {
    type: actionTypes.updateUsername,
    username,
  };
}

export function updatePassword(password) {
  return {
    type: actionTypes.updatePassword,
    password,
  };
}

// REDUCERS
export function loginReducer(state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.updateUsername:
      return {
        ...state,
        username: action.username,
      };
    case actionTypes.updatePassword:
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
}

// SELECTORS
export function getLoginCredentials(state) {
  return state.login;
}

// SAGAS
function* sendLoginSaga(action) {
  const loginCredential = yield select(getLoginCredentials);
  console.log(loginCredential);
}


export function* loginSaga() {
  yield* takeEvery(actionTypes.login, sendLoginSaga);
}
