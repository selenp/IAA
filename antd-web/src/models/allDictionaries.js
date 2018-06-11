import {
  allDictionaries,
} from '../services/api';

export default {
  namespace: 'allDictionaries',

  state: {
    data:{},
  },

  effects: {
    *allDictionaries(_, { call, put }) {
      const response = yield call(allDictionaries);
      yield put({
        type: 'init',
        payload: response,
      });
    },
  },

  reducers: {
    init(state, { payload }) {
      return {
        data: payload,
      };
    },
  },
};
