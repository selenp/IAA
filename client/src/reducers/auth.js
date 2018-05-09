import { EventRegister } from 'react-native-event-listeners';
import { AsyncStorage } from 'react-native';

import * as ACTION from '../constants/auth';
import { AVATAR_REQUEST, AVATAR_SUCCESS, AVATAR_FAILURE } from '../constants/upload';

const initialState = {
  loading: false,
  user: null,
  just_requested: false,
  error: '',
};

const auth =  (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SAVE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION.SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        just_requested: true,
        user: {
          ...action.res.user,
        },
        error: '',
      };
    case ACTION.SAVE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ACTION.VERIFYCODE_REQUEST:
    case ACTION.TOKEN_LOGIN_REQUEST:
    case AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION.VERIFYCODE_SUCCESS:
      AsyncStorage.setItem('token', action.res.token, () => {
        EventRegister.emit(ACTION.VERIFYCODE_SUCCESS);
      });
      return {
        ...state,
        loading: false,
        error: '',
      };
    case ACTION.TOKEN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...action.res.user,
        },
        error: '',
      };
    case AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.res.avatar,
        },
        error: '',
      };
    case ACTION.VERIFYCODE_FAILURE:
    case ACTION.TOKEN_LOGIN_FAILURE:
    case AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ACTION.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION.LOGOUT_SUCCESS:
       AsyncStorage.removeItem('token');
      return {
        ...initialState,
        loading: false,
        error: '',
      };
    case ACTION.LOGOUT_FAILURE:

      return {
        ...initialState,
        loading: false,
        error: action.error,
      };
    case ACTION.SEND_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTION.SEND_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ACTION.SEND_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default auth;
