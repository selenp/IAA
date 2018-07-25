import { message } from 'antd';
import { queryTasks } from '../services/api';
import { FILE_URL } from '../utils/utils';

export default {
  namespace: 'tasks',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryTasks, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *xlsx({ payload, t }, { call }) {
      const response = yield call(queryTasks, payload);
      message.success(t('文件下载中。。。'));

      document.location = `${FILE_URL}/${response.fileName}`;
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: {
          list: [...state.data.list, ...payload.content],
          pagination: {
            current: payload.pageable.pageNumber + 1,
            total: payload.totalElements,
          },
        },
      };
    },
    initData() {
      return {
        data: {
          list: [],
          pagination: {},
        },
      };
    },
  },
};
