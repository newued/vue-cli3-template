import axios from 'axios';
import domain from './const'
const form = (method = 'POST', url, formData) => {
  return new Promise((resolve, reject) => {
    let requestData = {
      // baseURL: `${domain.sundry}/files`,
      baseURL: `https://sundrywe.juketool.cn/files`,
      method,
      url,
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    };
    axios(requestData)
      .then(response => {
        if (response.status !== 200) {
          reject(response.statusText);
        } else {
          let res = response.data;
          if (!res.success) reject(res.message);
          resolve(res.data);
        }
      })
      .catch(() => {
        reject();
      });
  });
}

const create = method => {
  return (url, data, errCallback,type='form-data') => {
    return new Promise((resolve, reject) => {
      let requestData = {
        baseURL: '',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        method,
        url
      };
      if (data) {
        requestData['data'] = data;
      }
      if ((method.toUpperCase() === 'GET'||method.toUpperCase() === 'DELETE') && data) {
        requestData['params'] = data;
      }
      if ( method.toUpperCase() === 'PUT'&& data) {
        requestData.headers= {'Content-Type': 'multipart/form-data'}
        if (type === 'form-data') {
          let form = new FormData()
          Object.entries(data).forEach(([key, value]) => {
            form.append(key, value)
          })
          requestData.data = form
        } else if (type === 'json') {
          requestData.headers['Content-Type'] = 'application/json'
          requestData.data = data
        } else {
          requestData.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          requestData.data = data
        }
      }
      axios(requestData)
        .then(response => {
          if (response.status !== 200) reject(response);
          let res = response.data;
          if (res.success) {
            resolve(res.data);
          } else {
            if (errCallback && typeof errCallback === 'function') {
              errCallback(res);
            }
            reject(res);
          }
        })
        .catch(err => {
          if (
            err &&
            err.response &&
            err.response.status &&
            err.response.status === 401
          ) {
            reject(err);
          } else {
            reject({
              message: '服务器产生错误'
            });
          }
         // vue.$router.push({name:'netErrorPage'})
        });
    });
  }
}
/** 调用时xx.delete(url, data, errCallback,type='form-data') 后三个可选，
 * contentType取值可选：form-data对应multipart/form-data  json对应application/json ，其他对应 application/x-www-form-urlencoded
 */
export default {//
  get: create('GET'),
  post: create('POST'),
  put: create('PUT'),
  delete: create('DELETE'),
  form,
}
