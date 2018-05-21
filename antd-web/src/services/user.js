import request from '../utils/request';
import { REMOTE_URL } from '../utils/utils';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`${REMOTE_URL}/account/currentUser`);
}
