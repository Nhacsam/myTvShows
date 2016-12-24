import { Actions } from 'react-native-router-flux';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { register as registerAPI } from 'mySeries/src/services/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ACTION TYPES
export const actionTypes = {
  login: 'USER.LOGIN',
  register: 'USER.REGISTER',
  updateUsername: 'LOGIN.UPDATE_USERNAME',
  updatePassword: 'LOGIN.UPDATE_PASSWORD',
  updateEmail:  'LOGIN.UPDATE_EMAIL',
  loginSuccess: 'USER.LOGIN_SUCCESS',
  loginFail: 'USER.LOGIN_FAIL',
};

// ACTION CREATOR
export function login() {
  return { type: actionTypes.login };
}

export function register() {
  return { type: actionTypes.register };
}

export function registerSuccess() {
  return { type: actionTypes.loginSuccess };
}

export function registerFail(errorMsg) {
  return { type: actionTypes.loginFail, error: errorMsg};
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

export function updateEmail(email) {
  return {
    type: actionTypes.updateEmail,
    email,
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
    case actionTypes.updateEmail:
      return {
        ...state,
        email: action.email,
      };
    case actionTypes.loginSuccess:
      return {
        ...state,
        _metadata: {
          success: true,
        }
      };
    case actionTypes.loginFail:
      return {
        ...state,
        _metadata: {
          fail: true,
        }
      };
    case actionTypes.login:
    case actionTypes.register:
      return {
        ...state,
        _metadata: {
          fetching: true,
        }
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

function* sendRegisterSaga(action) {
  const loginCredential = yield select(getLoginCredentials);
  try {
    yield call(registerAPI, loginCredential);
    yield put(registerSuccess());
    yield call(delay, 1000);
    Actions.home();
  } catch (e) {
    yield put(registerFail());
  }
}


export function* loginSaga() {
  yield* takeEvery(actionTypes.register, sendRegisterSaga);
  yield* takeEvery(actionTypes.login, sendLoginSaga);
}
