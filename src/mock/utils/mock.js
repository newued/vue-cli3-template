import Mock from 'mockjs'
import formatOptions from './formatOptions'

Mock._mock = Mock.mock
Mock.mock = function (url, method, resFunc) {
  if (arguments.length === 1) {
    return this._mock(url)
  }
  if (arguments.length === 2) {
    console.error('Function Mock.mock require three params: url, method, resFunc!!!')
    return
  }
  if (arguments.length === 3) {
    let methods = ['get', 'post', 'put', 'delete']
    if (!methods.includes(method.toLowerCase())) {
      console.error('Function Mock.mock\'s second param should be get, post, put, delete!!!')
      return
    }
    if (typeof resFunc !== 'function') {
      console.error('Function Mock.mock\'s third param should be a function!!!')
      return
    }
  }
  // 将注册的 url 转成能匹配查询字符串的正则
  if (typeof url === 'string') {
    url = url.replace(/\//g, '\\/')
    url += '(|\\?.*)$'
    url = new RegExp(url)
  } else if (!(url instanceof RegExp)) {
    console.error('Function Mock.mock\'s first param should be a string or regexp!!!')
    return
  }
  this._mock(url, method, function (options) {
    // 格式化 options 对象
    options = formatOptions(options)
    let res = null
    try {
      res = resFunc(options)
    } catch (err) {
      res = err
    }
    // 将返回的测试数据打印到控制台
    console.groupCollapsed(`%c${options.type.toLowerCase()} | ${options.url}`, 'color: green;')
    console.log('%cparams: ', 'color: #38f')
    console.log(options.params)
    console.log('%cresponseData: ', 'color: #38f')
    console.log(res)
    console.groupEnd()
    console.log('---------------')
    return res
  })
}

export default Mock

/**
 *  mockjs 用法
Mock.mock(url, method, resFunc)
url (String)：需要进行 mock 的接口路径，也支持传入正则（但要自己考虑匹配带查询字符串的情况）
method (String): 请求的类型: get , post , put , delete ，忽略大小写
resFunc (Function): 生产测试数据的函数，回调参数为一个与请求有关的 options 对象，如下
{
  url: String, // 请求的路径
  type: String, // 请求的类型，GET, POST, PUT, DELETE
  params: Object // 请求的参数，如果是 post 和 put 请求为 body 的内容，get 和 delete 为查询字符串解析出的对象，没有则为 null
}

*/