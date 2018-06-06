import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryTask, submitTask } from '../services/api';

export default {
  namespace: 'task',

  state: {
    data: {
    },
  },

  effects: {
    * fetch({ id }, { call, put }) {
      const response = yield call(queryTask, id);
      yield put({
        type: 'task',
        payload: response,
      });
    },
    * submit({ payload, redirect }, { call, put }) {
      const response = yield call(submitTask, payload);
      yield put({
        type: 'task',
        payload: response,
      });
      message.success('提交成功');
      if (redirect) {
        yield put(routerRedux.push(redirect));
      }
    },
  },

  reducers: {
    task(state, { payload }) {

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
