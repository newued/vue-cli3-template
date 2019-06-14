import BaseApi from './ajax'
export default class User{
  login(data) {
    const url = '/user/login'
    return BaseApi.post(url, data)
  }
  logout(){
    const url = "/user/login"
    return BaseApi.get(url)
  }
  query(data){
    const url = '/user/query'
    return BaseApi.get(url, data)
  }

}