import { combineReducers } from 'redux';

import auth from './auth';
import nav from './nav';

const AppReducer = combineReducers({
  nav,
  auth,
});

export default AppReducer;
