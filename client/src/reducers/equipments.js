import * as ACTION from '../constants/equipment';

const INITIAL_STATE = {
  list: [],
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.FETCH_EQUIPMENTS_REQUEST:
      return {
        ...state,
        list: [],
        error: null,
        loading: true,
      };
    case ACTION.FETCH_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        list: action.res.list,
        error: null,
        loading: false,
      };
    case ACTION.FETCH_EQUIPMENTS_FAILURE:
      return {
        ...state,
        list: [],
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
