import axios from '~/axios'

export function getImageClassList(page = 1, limit = 10) {
  return axios.get('/admin/image_class/' + page + '?limit=' + limit)
}
