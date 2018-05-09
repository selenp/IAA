import * as ACTION from '../constants/equipment';

const INITIAL_STATE = {
  equipments: [],
  equipment: null,
  error: null,
  loading: false,
  modifying: false,
  modified: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.FETCH_EQUIPMENTS_REQUEST:
      return {
        ...state,
        equipments: [],
        error: null,
        loading: true,
      };
    case ACTION.FETCH_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        equipments: action.res.data,
        error: null,
        loading: false,
      };
    case ACTION.FETCH_EQUIPMENTS_FAILURE:
      return {
        ...state,
        equipments: [],
        error: action.error,
        loading: false,
      };
    case ACTION.FETCH_EQUIPMENT_REQUEST:
      return {
        ...state,
        equipment: null,
        error: null,
        loading: true,
      };
    case ACTION.FETCH_EQUIPMENT_SUCCESS:
      return {
        ...state,
        equipment: action.res.data,
        error: null,
        loading: false,
      };
    case ACTION.FETCH_EQUIPMENT_FAILURE:
      return {
        ...state,
        equipment: null,
        error: action.error,
        loading: false,
      };
    case ACTION.modify_EQUIPMENT_REQUEST:
      return {
        ...state,
        error: null,
        modifying: true,
        modified: false,
      };
    case ACTION.MODIFY_EQUIPMENT_SUCCESS:
      return {
        ...state,
        error: null,
        equipment: action.res.data,
        modifying: false,
        modified: true,
      };
    case ACTION.MODIFY_EQUIPMENT_FAILURE:
      return {
        ...state,
        error: action.error,
        modifying: false,
        modified: false,
      };
    case ACTION.MODIFY_EQUIPMENT_RESET:
      return {
        ...state,
        modified: false,
      };
    default:
      return state;
  }
};
