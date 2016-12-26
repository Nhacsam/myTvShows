import { fork } from 'redux-saga/effects';

import { loginSaga } from './Login';
import { tvShowsSaga } from './TVshows';

export default function* rootSaga() {
  yield [
    fork(loginSaga),
    fork(tvShowsSaga),
  ];
}
