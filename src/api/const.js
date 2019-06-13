
const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

// 域名
let signalr = `${protocol}://gatewaywetest.juketool.cn/signalr/cclient`,
  gateway = `${protocol}://gatewaywe.juketool.com`, // 网关域名
  sundry = `${protocol}://sundrynew.juketool.cn`; // 有关资源的域名

// 红包状态
export const redStatus = {
  success: 3, // 成功
  fail: 4, // 失败
  sending: 2, // 发送中
  loading: 1, // 待发送
  timeout: 5 // 超时未领取
}

export const domain = {
    signalr,
    gateway,
    sundry
  };
