import { stringify } from 'qs';
import request from '../utils/request';
import { REMOTE_URL } from '../utils/utils';

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

export async function submitDelivery(params) {
  return request(`${REMOTE_URL}/delivery/`, {
    method: 'POST',
    body: params,
  });
}

export async function queryDeliveries(params) {
  return request(`${REMOTE_URL}/delivery/?${stringify(params)}`);
}

export async function downloadDeliveries(params) {
  return request(`${REMOTE_URL}/delivery/xlsx?${stringify(params)}`);
}

export async function queryAdmins(params) {
  return request(`${REMOTE_URL}/admin/?${stringify(params)}`);
}

export async function downloadAdmins(params) {
  return request(`${REMOTE_URL}/admin/xlsx?${stringify(params)}`);
}

export async function queryDictionaries(params) {
  return request(`${REMOTE_URL}/dictionary/?${stringify(params)}`);
}

export async function downloadDictionaries(params) {
  return request(`${REMOTE_URL}/dictionary/xlsx?${stringify(params)}`);
}

export async function uploadSignature(id, io, image) {
  return request(`${REMOTE_URL}/delivery/${id}/${io}/signature`, {
    method: 'POST',
    body: image,
  });
}

export async function fetchDelivery(id) {
  return request(`${REMOTE_URL}/delivery/${id}`);
}

export async function fetchDictionary() {
  return request(`${REMOTE_URL}/dictionary/_all`);
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

export async function accountLogin(params) {
  return request(`${REMOTE_URL}/account/api-login-account`, {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
