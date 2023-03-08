import axios from '~/axios'

export function getImageClassList(page = 1, limit = 10) {
  return axios.get('/admin/image_class/' + page + '?limit=' + limit)
}

export function createImageClass(data) {
  return axios.post('/admin/image_class', data)
}

export function updateImageClass(id, data) {
  return axios.post('/admin/image_class/' + id, data)
}

export function deleteImageClass(id) {
  return axios.post('/admin/image_class/' + id + '/delete')
}

export function getImageList(id, page = 1, limit = 10) {
  return axios.get(`/admin/image_class/${id}/image/${page}?limit=${limit}`)
}

export function deleteImages(ids) {
  return axios.post('/admin/image/delete_all', { ids })
}

export function updateImage(id, name) {
  return axios.post('/admin/image/' + id, { name })
}
