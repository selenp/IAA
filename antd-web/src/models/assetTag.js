import { queryAssetTag } from '../services/api';

export default {
  namespace: 'assetTag',

  state: {
    history: [],
  },

  effects: {
    *fetchHistory({ assettag }, { call, put }) {
      const response = yield call(queryAssetTag, assettag);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        history: payload,
      };
    },
    init() {
      return {
        history: [],
      };
    },
  },
};
