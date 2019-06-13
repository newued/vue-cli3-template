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
  return (url, data, errCallback) => {
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
      if (method.toUpperCase() === 'GET' && data) {
        requestData['params'] = data;
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
          vue.$router.push({name:'netErrorPage'})
        });
    });
  }
}

export default {
  get: create('GET'),
  post: create('POST'),
  form,
}
