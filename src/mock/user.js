import Mock from './utils/mock'
// 注册 post 请求
Mock.mock('/user/login', 'post', options => {
  let { params } = options // options对象包含请求的 url，类型和携带的参数
  if (params.username && params.password) {
    return {
      data: '',
      code: 200,
      message: '登录成功'
    }
  } else {
    return {
      data: '',
      code: 300,
      message: '账号或密码未输入'
    }
  }
})
// 注册 get 请求
Mock.mock('/user/logout', 'get', options => {
  return {
    data: '',
    code: 200,
    message: '注销成功'
  }
})
// 注册带查询参数的 get 请求
Mock.mock('/user/query', 'get', options => {
  return {
    data: options.params,
    code: 200,
    message: 'ok'
  }
})