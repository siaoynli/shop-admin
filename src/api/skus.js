import axios from '~/axios'

export function getSkusList(page = 1, params = { limit: 10 }) {
  return axios.get(`/admin/skus/${page}`, { params })
}

export function createSkus(data) {
  return axios.post('/admin/skus', data)
}

export function updateSkus(id, data) {
  return axios.post(`/admin/skus/${id}`, data)
}

export function deleteSkus(ids) {
  ids = !Array.isArray(ids) ? [ids] : ids
  return axios.post(`/admin/skus/delete_all`, { ids })
}

export function updateSkusStatus(id, status = 0) {
  return axios.post(`/admin/skus/${id}/update_status`, { status })
}
