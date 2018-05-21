// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'guest';
}

export function setAuthority(authority) {
  if (authority)
    return localStorage.setItem('antd-pro-authority', authority);
  else
    return localStorage.removeItem('antd-pro-authority');
}
export function getToken() {
  return localStorage.getItem('antd-pro-token');
}

export function setToken(token) {
  if (token)
    return localStorage.setItem('antd-pro-token', token);
  else
    return localStorage.removeItem('antd-pro-token');
}
