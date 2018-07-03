import { searchLdap } from '../services/api';

export default {
  namespace: 'ldap2',

  state: {
    data1: {
    },
    data2: {
    },
  },

  effects: {
    * search1({ uid }, { call, put }) {
      const response = yield call(searchLdap, uid);
      yield put({
        type: 'ldap1',
        payload: response,
      });
    },
    * search2({ uid }, { call, put }) {
      const response = yield call(searchLdap, uid);
      yield put({
        type: 'ldap2',
        payload: response,
      });
    },
  },

  reducers: {
    ldap1(state, { payload }) {
      return {
        ...state,
        data1: payload,
      };
    },
    ldap2(state, { payload }) {
      return {
        ...state,
        data2: payload,
      };
    },
    initData1(state) {
      return {
        ...state,
        data1: {
        },
      };
    },
    initData2(state) {
      return {
        ...state,
        data2: {
        },
      };
    },
  },
};
