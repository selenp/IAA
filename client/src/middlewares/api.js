import { AsyncStorage } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import constants from '../constants/';

const Symbol = require('es6-symbol');

// middleware： 简化fetch处理， 并且加上token
const callApi = async (endpoint, init, token) => {
  let headers = {
    'Content-Type': 'application/json',
    uniqueId: DeviceInfo.getUniqueID(),
    ...init.headers,
  };

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }
  init.headers = new Headers(headers);

  if (!endpoint.startsWith(constants.REMOTE_URL)) {
    endpoint = `${constants.REMOTE_URL}${endpoint}`;
  }
  console.log('fetch', endpoint, init);

  return fetch(endpoint, init)
    .then(res => res.json().then((json) => {
      if (!res.ok) {
        throw `error:${res.code}`;
      } else if (!json.success) {
        throw json.msg;
      }

      return json;
    }));
};

export const CALL_API = Symbol('Call API');

export default store => next => async (action) => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, init = {}, types } = callAPI;

  const [requestType, successType, errorType] = types;
  next({ type: requestType });

  const token = await AsyncStorage.getItem('token');
  return await callApi(endpoint, init, token).then(
    res => next({
      res,
      type: successType,
    }),
    error => next({
      error,
      type: errorType,
    }),
  ).catch(e => next({
    error: '抱歉，出错了',
    type: errorType,
  }));
};
