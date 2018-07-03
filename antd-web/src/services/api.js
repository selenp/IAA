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
// delivery
export async function submitDelivery(params) {
  return request(`${REMOTE_URL}/delivery/`, {
    method: 'POST',
    body: params,
  });
}
export async function queryDeliveries(params) {
  return request(`${REMOTE_URL}/delivery/?${stringify(params)}`);
}
export async function uploadDeliverySignature(id, io, image) {
  return request(`${REMOTE_URL}/delivery/${id}/${io}/signature`, {
    method: 'POST',
    body: image,
  });
}
export async function fetchDelivery(id) {
  return request(`${REMOTE_URL}/delivery/${id}`);
}

// transfer
export async function submitTransfer(params) {
  return request(`${REMOTE_URL}/transfer-event/`, {
    method: 'POST',
    body: params,
  });
}
export async function queryTransfers(params) {
  return request(`${REMOTE_URL}/transfer-event/?${stringify(params)}`);
}
export async function fetchTransfer(id) {
  return request(`${REMOTE_URL}/transfer-event/${id}`);
}
export async function uploadTransferSignature(id, io, image) {
  return request(`${REMOTE_URL}/transfer-event/${id}/${io}/signature`, {
    method: 'POST',
    body: image,
  });
}

export async function queryAdmins(params) {
  return request(`${REMOTE_URL}/admin/?${stringify(params)}`);
}
export async function deleteAdmin(id) {
  return request(`${REMOTE_URL}/admin/${id}`, {
    method: 'DELETE',
  });
}
export async function queryAdmin(id) {
  return request(`${REMOTE_URL}/admin/${id}`);
}
export async function submitAdmin(params) {
  return request(`${REMOTE_URL}/admin/`, {
    method: 'POST',
    body: params,
  });
}

export async function allDictionaries() {
  return request(`${REMOTE_URL}/dictionary/_all`);
}

export async function queryDictionaries(params) {
  return request(`${REMOTE_URL}/dictionary/?${stringify(params)}`);
}
export async function deleteDictionary(id) {
  return request(`${REMOTE_URL}/dictionary/${id}`, {
    method: 'DELETE',
  });
}
export async function queryDictionary(id) {
  return request(`${REMOTE_URL}/dictionary/${id}`);
}
export async function submitDictionary(params) {
  return request(`${REMOTE_URL}/dictionary/`, {
    method: 'POST',
    body: params,
  });
}

// tasks
export async function queryTasks(params) {
  return request(`${REMOTE_URL}/task/?${stringify(params)}`);
}
export async function queryTask(id) {
  return request(`${REMOTE_URL}/task/${id}`);
}
export async function deleteTask(id) {
  return request(`${REMOTE_URL}/task/${id}`, {
    method: 'DELETE',
  });
}
export async function submitTask(params) {
  return request(`${REMOTE_URL}/task/`, {
    method: 'POST',
    body: params,
  });
}

// entities
export async function queryEntities(name, params) {
  return request(`${REMOTE_URL}/${name}/?${stringify(params)}`);
}
export async function queryEntity(name, id) {
  return request(`${REMOTE_URL}/${name}/${id}`);
}
export async function deleteEntity(name, id) {
  return request(`${REMOTE_URL}/${name}/${id}`, {
    method: 'DELETE',
  });
}
export async function submitEntity(name, params) {
  return request(`${REMOTE_URL}/${name}/`, {
    method: 'POST',
    body: params,
  });
}

export async function queryAssetTag(assettag) {
  return request(`${REMOTE_URL}/assettag/${encodeURIComponent(assettag)}`);
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
export async function searchLdap(uid) {
  return request(`${REMOTE_URL}/ldap/search/${uid}`);
}

export async function queryNotices() {
  return request('/api/notices');
}
