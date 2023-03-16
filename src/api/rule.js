import axios from '~/axios'

export function getRuleList(page = 1, params = { limit: 10 }) {
  return axios.get(`/admin/rule/${page}?limit=${params.limit}`)
}

export function createRule(data) {
  return axios.post('/admin/rule', data)
}

export function updateRule(id, data) {
  return axios.post(`/admin/rule/${id}`, data)
}

export function deleteRule(id) {
  return axios.post(`/admin/rule/${id}/delete`)
}
