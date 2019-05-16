import request from '@/utils/request';

export function getAddresses(id) {
  return request({
    url: `/api/addresses/${id}`,
    method: 'get'
  })
}


export function addAddress({ id, payload }) {
  let { firstname, lastname, address, city, province, postalCode } = payload;
  return request({
    url: `/api/addresses/${id}`,
    method: 'post',
    data: {
      firstname,
      lastname,
      address,
      city,
      province,
      postalCode
    }
  })
}

export function deleteAddress({ id, addressId }) {
  return request({
    url: `/api/addresses/${id}/${addressId}`,
    method: 'delete'
  })
}
