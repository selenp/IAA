import { downloadAdmins, queryAdmins } from '../services/api';
import { message } from 'antd';
import { FILE_URL } from '../utils/utils';

export default {
  namespace: 'admins',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAdmins, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *xlsx({ payload }, { call }) {
      const response = yield call(downloadAdmins, payload);
      message.success('文件下载中。。。');

      document.location = `${FILE_URL}/images/${response.fileName}`;
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        data: {
          list: payload.content,
          pagination: {
            current: payload.pageable.pageNumber + 1,
            total: payload.totalElements,
          },
        },
      };
    },
    init() {
      return {
        data: {
          list: [],
          pagination: {},
        },
      };
    },
  },
};
