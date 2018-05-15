import { combineReducers } from 'redux';

import auth from './auth';
import equipments from './equipments';
import equipment from './equipment';
import users from './users';
import user from './user';
import nav from './nav';

const AppReducer = combineReducers({
  nav,
  auth,
  equipments,
  equipment,
  users,
  user,
});

export default AppReducer;
