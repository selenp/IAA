import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function submitEquipment(params) {
  return request('http://39.106.104.75:3050/equipment/', {
    method: 'POST',
    body: params,
  });
}

export async function queryEquipments(params) {
  return request(`http://39.106.104.75:3050/equipment/?${stringify(params)}`);
}

export async function downloadEquipments(params) {
  return request(`http://39.106.104.75:3050/equipment/xlsx?${stringify(params)}`);
}

export async function uploadSignature(id, io, image) {
  return request(`http://39.106.104.75:3050/equipment/${id}/${io}/signature`, {
    method: 'POST',
    body: image,
  });
}

export async function fetchEquipment(id) {
  return request(`http://39.106.104.75:3050/equipment/${id}`);
}

export async function fetchDictionary() {
  return request('http://39.106.104.75:3050/equipment/dictionary');
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('http://39.106.104.75:3050/equipment/api-login-account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
