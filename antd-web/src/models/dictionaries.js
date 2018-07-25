import { message } from 'antd';
import {
  queryDictionaries,
  deleteDictionary,
} from '../services/api';

export default {
  namespace: 'dictionaries',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryDictionaries, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *delete({ id, t }, { call, put }) {
      yield call(deleteDictionary, id);
      message.success(t('删除完毕'));
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
