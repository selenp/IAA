import { CALL_API } from '../middlewares/api';

import * as ACTION from '../constants/equipment';

export const fetchEquipments = () => ({
  [CALL_API]: {
    endpoint: '/api/equipment',
    init: {
      method: 'GET',
    },
    types: [
      ACTION.FETCH_EQUIPMENTS_REQUEST,
      ACTION.FETCH_EQUIPMENTS_SUCCESS,
      ACTION.FETCH_EQUIPMENTS_FAILURE,
    ],
  },
});

export const fetchEquipment = _id => ({
  [CALL_API]: {
    endpoint: `/api/equipment/${_id}`,
    init: {
      method: 'GET',
    },
    types: [
      ACTION.FETCH_EQUIPMENT_REQUEST,
      ACTION.FETCH_EQUIPMENT_SUCCESS,
      ACTION.FETCH_EQUIPMENT_FAILURE,
    ],
  },
});

export const modifyEquipment = data => ({
  [CALL_API]: {
    endpoint: '/api/equipment',
    init: {
      method: 'POST',
      body: JSON.stringify(data),
    },
    types: [
      ACTION.MODIFY_EQUIPMENT_REQUEST,
      ACTION.MODIFY_EQUIPMENT_SUCCESS,
      ACTION.MODIFY_EQUIPMENT_FAILURE,
    ],
  },
});

export const resetModifyEquipment = () => ({
  type: ACTION.MODIFY_EQUIPMENT_RESET,
});
