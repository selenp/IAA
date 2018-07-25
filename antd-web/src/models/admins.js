import { message } from 'antd';
import { queryAdmins, deleteAdmin } from '../services/api';
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
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryAdmins, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *delete({ id, t }, { call, put }) {
      yield call(deleteAdmin, id);
      message.success(t('删除完毕'));
      yield put({
        type: 'remove',
        id,
      });
    },
    *xlsx({ payload, t }, { call }) {
      const response = yield call(queryAdmins, payload);
      message.success(t('文件下载中。。。'));

      document.location = `${FILE_URL}/${response.fileName}`;
    },
  },

  reducers: {
    remove(state, {id}) {
      const newState = { ...state };
      const tobeDelete = newState.data.list.findIndex((e) => e.id === id);
      newState.data.list.splice(tobeDelete, 1);

      return newState;
    },
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
