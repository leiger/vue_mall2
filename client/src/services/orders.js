import request from '@/utils/request';

export function getOrderById(orderId) {
  return request({
    url: `/api/orders/${orderId}`,
    method: 'get'
  })
}

export function addOrder({ userId, total, addressId }) {
  return request({
    url: '/api/orders',
    method: 'post',
    data: {
      userId,
      total,
      addressId
    }
  })
}

export function modifyOrderState({ orderId, status }) {
  return request({
    url: `/api/orders/${orderId}`,
    method: 'put',
    data: {
      status
    }
  })
}
