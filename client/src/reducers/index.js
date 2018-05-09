import { combineReducers } from 'redux';

import auth from './auth';
import equipment from './equipment';
import nav from './nav';

const AppReducer = combineReducers({
  nav,
  auth,
  equipment,
});

export default AppReducer;
