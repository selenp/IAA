import { AsyncStorage } from 'react-native';

import * as ACTION from '../constants/auth';
import { AVATAR_REQUEST, AVATAR_SUCCESS, AVATAR_FAILURE } from '../constants/upload';

const initialState = {
  loading: false,
  user: {
    mobile_no: '',
    memo: '',
    avatar: null,
    token: '',
    funcs: {
      news: [],
      swipers: [],
      shortcuts: [],
      applications: [],
      wallet: [],
    },
    badge: {},
    ecard: {
      balance: 0,
    },
  },
  just_requested: false,
  error: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SAVE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION.SAVE_PROFILE_SUCCESS:
      const u1 = {
        ...action.res.user,
      };

      AsyncStorage.setItem('user', JSON.stringify(u1));
      return {
        ...state,
        loading: false,
        just_requested: true,
        user: u1,
        error: '',
      };
    case ACTION.SAVE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ACTION.LOGIN_REQUEST:
    case ACTION.TOKEN_LOGIN_REQUEST:
    case AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION.LOGIN_SUCCESS:
    case ACTION.TOKEN_LOGIN_SUCCESS:
      const u = {
        ...action.res.user,
      };
      AsyncStorage.setItem('user', JSON.stringify(u));

      return {
        ...state,
        loading: false,
        user: u,
        error: '',
      };
    case AVATAR_SUCCESS:
      const u2 = {
        ...state.user,
        avatar: action.res.avatar,
      };
      AsyncStorage.setItem('user', JSON.stringify(u2));

      return {
        ...state,
        loading: false,
        user: u2,
        error: '',
      };
    case ACTION.LOGIN_FAILURE:
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
      AsyncStorage.removeItem('user');
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
    case ACTION.INITIAL_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default auth;
