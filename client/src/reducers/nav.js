import { NavigationActions } from 'react-navigation';

import * as AUTH_ACTION from '../constants/auth';

import { AppNavigator } from '../navigators/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

const nav = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      );
    case AUTH_ACTION.TOKEN_LOGIN_FAILURE:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
    case AUTH_ACTION.LOGOUT_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        initialState,
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
export default nav;
