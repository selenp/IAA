import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryAdmin, submitAdmin } from '../services/api';

export default {
  namespace: 'admin',

  state: {
    data: {
    },
  },

  effects: {
    * fetch({ id }, { call, put }) {
      const response = yield call(queryAdmin, id);
      yield put({
        type: 'admin',
        payload: response,
      });
    },
    * submit({ payload }, { call, put }) {
      const response = yield call(submitAdmin, payload);
      yield put({
        type: 'admin',
        payload: response,
      });
      message.success('提交成功');
      yield put(routerRedux.push(`/system/admins`));
    },
  },

  reducers: {
    admin(state, { payload }) {

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
