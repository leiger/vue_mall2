import axios from 'axios';
import { Notice } from 'iview';
import Router from '../router';

const service = axios.create({
  baseURL: "/", // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  res => {
    // const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      return Promise.reject(res.message || 'error')
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error) // for debug

    Notice.error({
      title: error.response.status,
      desc: error.response.data
    });
    if (error.response.status === 404) {
      Router.push('/404');
    }

    return Promise.reject(error)
  }
)

export default service
