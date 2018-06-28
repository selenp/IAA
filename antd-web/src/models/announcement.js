import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryEntity, submitEntity } from '../services/api';

export default {
  namespace: 'announcement',

  state: {
    data: {},
  },

  effects: {
    *fetch({ id }, { call, put }) {
      const response = yield call(queryEntity, 'announcement', id);
      yield put({
        type: 'entity',
        payload: response,
      });
    },
    *submit({ payload, redirect, t }, { call, put }) {
      const response = yield call(submitEntity, 'announcement', payload);
      yield put({
        type: 'entity',
        payload: response,
      });
      message.success(t('提交成功'));
      if (redirect) {
        yield put(routerRedux.push(redirect));
      }
    },
  },

  reducers: {
    entity(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    initData() {
      return {
        data: {},
      };
    },
  },
};
