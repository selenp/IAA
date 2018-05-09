import * as ACTION from '../constants/equipment';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false,
  saving: false,
  just_saved: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.FETCH_EQUIPMENT_REQUEST:
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
      };
    case ACTION.FETCH_EQUIPMENT_SUCCESS:
      return {
        ...state,
        data: action.res.data,
        error: null,
        loading: false,
      };
    case ACTION.FETCH_EQUIPMENT_FAILURE:
      return {
        ...state,
        data: null,
        error: action.error,
        loading: false,
      };
    case ACTION.modify_EQUIPMENT_REQUEST:
      return {
        ...state,
        error: null,
        saving: true,
        just_saved: false,
      };
    case ACTION.MODIFY_EQUIPMENT_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.res.data,
        saving: false,
        just_saved: true,
      };
    case ACTION.MODIFY_EQUIPMENT_FAILURE:
      return {
        ...state,
        error: action.error,
        saving: false,
        just_saved: false,
      };
    case ACTION.MODIFY_EQUIPMENT_RESET:
      return {
        ...state,
        just_saved: false,
      };
    default:
      return state;
  }
};
