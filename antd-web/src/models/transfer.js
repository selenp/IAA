import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fetchTransfer,
  submitTransfer,
  uploadTransferSignature,
} from '../services/api';

export default {
  namespace: 'transfer',

  state: {
    step: {
    },
  },

  effects: {
    *fetch({ id }, { call, put }) {
      const response = yield call(fetchTransfer, id);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *submitTransfer({ payload, next }, { call, put }) {
      const response = yield call(submitTransfer, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      message.success('提交成功');
      yield put(routerRedux.push(next));
    },
    *uploadTransferSignature({id, io, payload }, { call, put }) {
      const response = yield call(uploadTransferSignature, id, io, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      message.success('流程处理成功，回执已经发送到您的工作邮箱，请注意查收。');

      yield put(routerRedux.push('/transfers/list'));
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
