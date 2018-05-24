import {
  downloadDictionaries,
  queryDictionaries,
  deleteDictionary,
} from '../services/api';
import { message } from 'antd';
import { FILE_URL } from '../utils/utils';

export default {
  namespace: 'dictionaries',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDictionaries, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *xlsx({ payload }, { call }) {
      const response = yield call(downloadDictionaries, payload);
      message.success('文件下载中。。。');

      document.location = `${FILE_URL}/images/${response.fileName}`;
    },
    *delete({ id }, { call, put }) {
      yield call(deleteDictionary, id);
      message.success('删除完毕');
      yield put({
        type: 'remove',
        id,
      });
    },
  },

  reducers: {
    remove(state, {id}) {
      const newState = { ...state };
      const tobeDelete = newState.data.list.findIndex((e) => e.id === id);
      newState.data.list.splice(tobeDelete, 1);

      return newState;
    },
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