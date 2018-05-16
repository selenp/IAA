import { downloadEquipments, queryEquipments } from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'equipments',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryEquipments, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *xlsx({ payload }, { call }) {
      const response = yield call(downloadEquipments, payload);
      message.success('文件下载中。。。');

      document.location = `http://39.106.104.75:3022/images/${response.fileName}`;
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        data: {
          list: payload,
          pagination: {},
        },
      };
    },
  },
};
