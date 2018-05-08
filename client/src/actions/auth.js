import { CALL_API } from '../middlewares/api';
import * as ACTION from '../constants/auth';

export const sendcode = info => ({
  [CALL_API]: {
    endpoint: '/api/auth/send_code',
    init: {
      method: 'POST',
      body: JSON.stringify(info),
    },
    types: [
      ACTION.SEND_CODE_REQUEST,
      ACTION.SEND_CODE_SUCCESS,
      ACTION.SEND_CODE_FAILURE,
    ],
  },
});

export const verifycode = info => ({
  [CALL_API]: {
    endpoint: '/api/auth/verify_code',
    init: {
      method: 'POST',
      body: JSON.stringify(info),
    },
    types: [
      ACTION.VERIFYCODE_REQUEST,
      ACTION.VERIFYCODE_SUCCESS,
      ACTION.VERIFYCODE_FAILURE,
    ],
  },
});

export const tokenLogin = token => ({
  [CALL_API]: {
    endpoint: '/api/account',
    init: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    types: [
      ACTION.TOKEN_LOGIN_REQUEST,
      ACTION.TOKEN_LOGIN_SUCCESS,
      ACTION.TOKEN_LOGIN_FAILURE,
    ],
  },
});

export const profile = info => ({
  [CALL_API]: {
    endpoint: '/api/account',
    init: {
      method: 'POST',
      body: JSON.stringify(info),
    },
    types: [
      ACTION.SAVE_PROFILE_REQUEST,
      ACTION.SAVE_PROFILE_SUCCESS,
      ACTION.SAVE_PROFILE_FAILURE,
    ],
  },
});

export const logout = () => ({
  [CALL_API]: {
    endpoint: '/api/auth/logout',
    types: [
      ACTION.LOGOUT_REQUEST,
      ACTION.LOGOUT_SUCCESS,
      ACTION.LOGOUT_FAILURE,
    ],
  },
});

export const initialUser = user => ({
  type: ACTION.INITIAL_USER,
  user,
});
