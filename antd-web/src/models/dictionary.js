import { compact } from 'lodash';
import {
  fetchDictionary,
} from '../services/api';

export default {
  namespace: 'dictionary',

  state: {
    businessUnits:[],
    projectNames:[],
  },

  effects: {
    *fetchDictionaryData(_, { call, put }) {
      const response = yield call(fetchDictionary);
      yield put({
        type: 'init',
        payload: response,
      });
    },
  },

  reducers: {
    init(state, { payload }) {
      return {
        businessUnits: compact(payload.businessUnits),
        projectNames: compact(payload.projectNames),
      };
    },
  },
};
