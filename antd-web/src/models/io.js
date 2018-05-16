import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fetchDictionary,
  fetchEquipment,
  submitEquipment,
  uploadSignature,
} from '../services/api';

export default {
  namespace: 'io',

  state: {
    step: {
    },
    businessUnits:[],
    projectNames:[],
  },

  effects: {
    *fetchDictionaryData(_, { call, put }) {
      const response = yield call(fetchDictionary);
      yield put({
        type: 'initData',
        payload: response,
      });
    },
    *fetch({ id }, { call, put }) {
      const response = yield call(fetchEquipment, id);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *submitEquipment({ payload, next }, { call, put }) {
      const response = yield call(submitEquipment, payload);
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

      yield put(routerRedux.push('/io/main'));
    },
  },

  reducers: {
    initData(state, { payload }) {
      return {
        step: {
        },
        businessUnits: payload.businessUnits,
        projectNames: payload.projectNames,
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
