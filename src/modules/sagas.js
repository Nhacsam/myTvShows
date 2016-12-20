import { fork } from 'redux-saga/effects';

import { loginSaga } from './Login';

export default function* rootSaga() {
  yield fork(loginSaga);
}
