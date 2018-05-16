import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('http://39.106.104.75:3050/equipment/currentUser');
}
