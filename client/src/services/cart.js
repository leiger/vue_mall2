import request from '@/utils/request';

export function getCartList(id) {
  return request({
    url: `/api/carts/${id}`,
    method: 'get'
  })
}


export function updateCartList({ id, productId, changeNum }) {
  return request({
    url: `/api/carts/${id}`,
    method: 'put',
    data: {
      productId,
      changeNum
    }
  })
}
