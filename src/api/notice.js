import axios from '~/axios'

export function getNoticeList(page = 1, limit = 10) {
  return axios.get(`/admin/notice/${page}?limit=${limit}`)
}

export function deleteNotice(id) {
  return axios.post(`/admin/notice/${id}/delete`)
}
