import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryDictionary, submitDictionary } from '../services/api';

export default {
  namespace: 'dictionary',

  state: {
    data: {
    },
  },

  effects: {
    * fetch({ id }, { call, put }) {
      const response = yield call(queryDictionary, id);
      yield put({
        type: 'dictionary',
        payload: response,
      });
    },
    * submit({ payload, t }, { call, put }) {
      const response = yield call(submitDictionary, payload);
      yield put({
        type: 'dictionary',
        payload: response,
      });
      message.success(t('提交成功'));
      yield put(routerRedux.push(`/system/dictionaries`));
    },
  },

  reducers: {
    dictionary(state, { payload }) {

      return {
        ...state,
        data: payload,
      };
    },
    deletedMember(state, { payload }) {
      return {
        data: {
          ...state.data,
        },
      };
    },
  },
};
