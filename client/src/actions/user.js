import { CALL_API } from '../middlewares/api';

import * as ACTION from '../constants/user';

export const fetchUsers = () => ({
  [CALL_API]: {
    endpoint: '/mp/user',
    types: [
      ACTION.FETCH_USERS_REQUEST,
      ACTION.FETCH_USERS_SUCCESS,
      ACTION.FETCH_USERS_FAILURE,
    ],
  },
});

export const fetchUser = _id => ({
  [CALL_API]: {
    endpoint: `/mp/user/${_id}`,
    types: [
      ACTION.FETCH_USER_REQUEST,
      ACTION.FETCH_USER_SUCCESS,
      ACTION.FETCH_USER_FAILURE,
    ],
  },
});

export const modifyUser = data => ({
  [CALL_API]: {
    endpoint: '/mp/user',
    init: {
      method: 'POST',
      body: JSON.stringify(data),
    },
    types: [
      ACTION.MODIFY_USER_REQUEST,
      ACTION.MODIFY_USER_SUCCESS,
      ACTION.MODIFY_USER_FAILURE,
    ],
  },
});

export const resetModifyUser = () => ({
  type: ACTION.MODIFY_USER_RESET,
});
