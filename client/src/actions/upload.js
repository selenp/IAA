import { CALL_API } from '../middlewares/api';
import * as ACTION from '../constants/upload';

/*
 * 上载头像
 */
export const avatar = info => ({
  [CALL_API]: {
    endpoint: '/api/account/uploadAvatar',
    init: {
      method: 'POST',
      body: JSON.stringify(info),
    },
    types: [
      ACTION.AVATAR_REQUEST,
      ACTION.AVATAR_SUCCESS,
      ACTION.AVATAR_FAILURE,
    ],
  },
});
