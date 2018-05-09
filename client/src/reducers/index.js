import { combineReducers } from 'redux';

import auth from './auth';
import equipments from './equipments';
import equipment from './equipment';
import nav from './nav';

const AppReducer = combineReducers({
  nav,
  auth,
  equipments,
  equipment,
});

export default AppReducer;
