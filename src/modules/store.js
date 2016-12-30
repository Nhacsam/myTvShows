import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

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
    autoRehydrate(),
  ];

  const store = createStore(
    reducers,
    undefined,
    composeEnhancers(...enhancers)
  );
  sagaMiddleware.run(rootSaga);

  return persistStore(store, { storage: AsyncStorage }, () => callback(store));
};
