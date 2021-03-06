import { message } from 'antd';
import { queryTransfers } from '../services/api';
import { FILE_URL } from '../utils/utils';

export default {
  namespace: 'transfers',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryTransfers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *xlsx({ payload, t }, { call }) {
      const response = yield call(queryTransfers, payload);
      message.success(t('文件下载中。。。'));

      document.location = `${FILE_URL}/${response.fileName}`;
    },
  },

  reducers: {
    save(state, { payload }) {
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
