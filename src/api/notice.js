import axios from '~/axios'

export function getNoticeList(page = 1, limit = 10) {
  return axios.get(`/admin/notice/${page}?limit=${limit}`)
}

export function createNotice(data) {
  return axios.post('/admin/notice', data)
}

export function updateNotice(id, data) {
  return axios.post(`/admin/notice/${id}`, data)
}

export function deleteNotice(id) {
  return axios.post(`/admin/notice/${id}/delete`)
}
