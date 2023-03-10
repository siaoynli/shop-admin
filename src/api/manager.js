import axios from '~/axios'

export function login(username, password) {
  return axios.post('/admin/login', { username, password })
}

export function getinfo() {
  return axios.post('/admin/getinfo')
}

export function logout() {
  return axios.post('admin/logout')
}

export function updatePassword(data) {
  return axios.post('admin/updatepassword', data)
}

export function getManagerList(page = 1, params = { keyword: '', limit: 10 }) {
  return axios.get(`/admin/manager/${page}`, { params })
}

export function createManager(data) {
  return axios.post('/admin/manager', data)
}

export function updateManager(id, data) {
  return axios.post(`/admin/manager/${id}`, data)
}

export function updateManagerStatus(id, status = 0) {
  return axios.post(`/admin/manager/${id}/update_status`, { status })
}

export function deleteManager(id) {
  return axios.post(`/admin/manager/${id}/delete`)
}
