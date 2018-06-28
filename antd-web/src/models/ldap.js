import { searchLdap } from '../services/api';

export default {
  namespace: 'ldap',

  state: {
    data: {
    },
  },

  effects: {
    * search({ uid }, { call, put }) {
      const response = yield call(searchLdap, uid);
      yield put({
        type: 'ldap',
        payload: response,
      });
    },
  },

  reducers: {
    ldap(state, { payload }) {

      return {
        ...state,
        data: payload,
      };
    },
    initData() {
      return {
        data: {
        },
      };
    },
  },
};
