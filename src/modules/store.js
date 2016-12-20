import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ level: 'info' });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (callback) => {
  const middlewares = [
    sagaMiddleware,
    loggerMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    reducers,
    undefined,
    composeEnhancers(...enhancers)
  );
  sagaMiddleware.run(rootSaga);

  return callback(store);
};
