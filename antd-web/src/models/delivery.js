import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fetchDelivery,
  submitDelivery,
  uploadSignature,
} from '../services/api';

export default {
  namespace: 'delivery',

  state: {
    step: {
    },
  },

  effects: {
    *fetch({ id }, { call, put }) {
      const response = yield call(fetchDelivery, id);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *submitDelivery({ payload, next }, { call, put }) {
      const response = yield call(submitDelivery, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      message.success('提交成功');
      yield put(routerRedux.push(next));
    },
    *uploadSignature({id, io, payload }, { call, put }) {
      const response = yield call(uploadSignature, id, io, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      message.success('流程处理成功，回执已经发送到您的工作邮箱，请注意查收。');

      yield put(routerRedux.push('/delivery/main'));
    },
  },

  reducers: {
    initData(state, { payload }) {
      return {
        step: {
        },
      };
    },
    saveData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
