import { combineReducers } from 'redux';
import { loginReducer as login } from './Login';

const appReducer = combineReducers({
  login,
});

const initialState = {};

const rootReducer = (state = initialState, action = {}) => (appReducer(state, action));
export default rootReducer;
