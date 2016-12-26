import { combineReducers } from 'redux';
import { loginReducer as login } from './Login';
import { tvShowsReducer as tvShows } from './TVshows';

const appReducer = combineReducers({
  login,
  tvShows,
});

const initialState = {};

const rootReducer = (state = initialState, action = {}) => (appReducer(state, action));
export default rootReducer;
