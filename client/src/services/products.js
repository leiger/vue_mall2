import request from '@/utils/request';

export function getProducts() {
  return request({
    url: '/api/products',
    method: 'get'
  })
}

export function getProductById(id) {
  return request({
    url: `/api/products/${id}`,
    method: 'get'
  })
}

export function getCategories() {
  return request({
    url: '/api/categories',
    method: 'get'
  })
}
