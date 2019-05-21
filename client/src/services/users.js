import request from '@/utils/request';

export function checkState() {
  return request({
    url: '/api/auth',
    method: 'get'
  })
}


export function login(data) {
  return request({
    url: '/api/auth',
    method: 'post',
    data
  })
}

export function logOut() {
  return request({
    url: '/api/auth',
    method: 'delete'
  })
}

export function signUp(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `/api/users/${id}`,
    method: 'get'
  })
}
