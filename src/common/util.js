/* eslint-disable */
import ajax from '../api/ajax'
import {domain} from '../api/const'
const wx = require('weixin-js-sdk');
/***
 * @Tool:微信初始化config，单页面应用每次路由发生变化时调用
 * @Param:  APPid能相关信息
 *
 */
export const wxInit=(res) => {
  if(!window.activityContext){console.error('can not found activityContext');return;}
  wx.config({
    debug: false,
    appId:activityContext.jsSdk.appId,
    timestamp:activityContext.jsSdk.timestamp,
    nonceStr: activityContext.jsSdk.nonceStr,
    signature:activityContext.jsSdk.signature,
    jsApiList: ['chooseImage','previewImage','uploadImage','getLocalImgData','onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
  });
}
/*
 * @Tool: iOS Wechat 标题不能修改 BUG
 * @Param: title: 希望当前页面标题名称
 * @Warn: 最新微信版本中有 iframe 空白, 可在组件内使用
 */
export const setTitle = function (title) {
  document.title = title
  let ua = navigator.userAgent.toLowerCase()
  // IPHONE版无法监听TITLE 需要IFRAME触发
  if (ua.indexOf('iphone') > -1) {
    let $body = document.body
    let $iframe = document.createElement('iframe')
    $iframe.src = '//sc.mysodao.com/app/juke-m/src/imgs/f-icon-x.png'
    $iframe.width = '0px'
    $iframe.height = '0px'
    $iframe.frameBorder = '0px'
    $iframe.onload = function () {
      setTimeout(function () {
        $body.removeChild($iframe)
      }, 0)
    }
    $body.appendChild($iframe)
  }
}
/**
* @Tool: 图片上传2   ！！利用本司上传API上传
* @returns { Promise } resolve: { responseText: ' }
*/
export const upLoadImages=(file)=>{
/*   let uploading
  const choose = () => new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 使用压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => resolve(res),
      fail: failmsg => reject(failmsg.errMsg)
    })
  })
  const upload = data => new Promise((resolve, reject) => {
    let localId = data.localIds[0] // 需要上传的图片的本地ID，由chooseImage接口获得
    uploading=vue.$Loading("图片上传中")
    setTimeout(() => { // 获取serverId
      wx.uploadImage({
        localId,
        isShowProgressTips: 1,
        success: res => resolve({ res, localId }),
        fail: failmsg => reject(failmsg.errMsg)
      })
    }, 200)
  })
  const resHandler = data => new Promise((resolve, reject) => {
      // 兼容 iOS WKWebview 不支持 localId 直接显示图片的问题
      // ios使用wx JSSDK获取BASE64图片

      wx.getLocalImgData({
        localId: data.localId,
        success: res => {
          ajax.post('//wxim.juketool.com/files/juketool', {
            base64: res.localData
          }).then(res => {
            if (res.Success && res.Url) {
              resolve({ serverId: data.res.serverId, localId: res.Url })
            } else reject(res.msg)
          }).catch(e => reject(e))
        },
        fail: failmsg => reject(failmsg.errMsg)
      })
    })
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      resolve(choose().then(upload).then(resHandler).then(data => {
        uploading&&uploading.close()
        return data
      }))
    })
    wx.error((res)=>{
      wxInit()
      uploading&&uploading.close()
      reject(res)
    })
  }) */
  let upload = (file) => {
   return new Promise((resolve, reject) => {
     let fd = new FormData()
     let xhr = new XMLHttpRequest()
     fd.append('file', file)
     xhr.open('POST', `${domain.sundry}/files/upload`)
     xhr.send(fd)
     xhr.onreadystatechange = () => {
       if (xhr.readyState === 4) {
         if ((xhr.status >= 200 && xhr.status <= 207) || xhr.status === 304) {
           let res = JSON.parse(xhr.responseText)
           resolve(res)
         } else {
           reject({
             errorText: '上传失败'
           })
         }
       }
     }
   })
 }
 return upload(file).then(data => data)
}
/**
* @Tool: 图片上传
* @returns { Promise } resolve: { localId: '', serverId: '' }
*/
export const uploadImg = function () {
  const choose = () => new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 使用压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => resolve(res),
      fail: failmsg => reject(failmsg.errMsg)
    })
  })
  const upload = data => new Promise((resolve, reject) => {
    layer.open({ type: 2 })
    let localId = data.localIds[0] // 需要上传的图片的本地ID，由chooseImage接口获得
    setTimeout(() => { // 获取serverId
      wx.uploadImage({
        localId:localId.toString(),
        isShowProgressTips: 1,
        success: res => resolve({ res, localId }),
        fail: failmsg => reject(failmsg.errMsg)
      })
    }, 200)
  })
  const resHandler = data => {
    return new Promise((resolve, reject) => {
      // 兼容 iOS WKWebview 不支持 localId 直接显示图片的问题
      // ios使用wx JSSDK获取BASE64图片

      wx.getLocalImgData({
        localId: data.localId,
        success: res => {
          ajax.post('//wxim.juketool.com/files/juketool', {
            base64: res.localData
          }).then(res => {
            if (res.Success && res.Url) {
              resolve({ serverId: data.res.serverId, localId: res.Url })
            } else reject(res.msg)
          }).catch(e => reject(e))
        },
        fail: failmsg => reject(failmsg.errMsg)
      })
    })
  }

  // 选择图片->上传->处理结果，iOS要转换地址->关闭loading，返回结果
  return choose().then(upload).then(resHandler).then(data => {
    layer.closeAll()
    return data
  })
  // 需要的话就返回的Promise后加上错误处理
  // .catch(failmsg => layer.open({ content: failmsg, skin: 'msg', time: 1 }))
}

/**
* @Tool: 设置微信分享
*/
export const setWXShare = function (title, link, desc, img, callBack) {
  const ShareTitle = title
  const ShareLink = link
  const ShareDesc = desc
  const ShareImg = img // 推荐尺寸200x200
  wxInit()
  wx.ready(() => {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: ShareTitle, // 分享标题
      link: ShareLink, // 分享链接
      imgUrl: ShareImg, // 分享图标
      success: function () {},
      cancel: function () {}
    })
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: ShareTitle, // 分享标题
      desc: ShareDesc, // 分享描述
      link: ShareLink, // 分享链接
      imgUrl: ShareImg, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {

      },
      cancel: function () {}
    })
    // 分享到QQ
    wx.onMenuShareQQ({
      title: ShareTitle, // 分享标题
      desc: ShareDesc, // 分享描述
      link: ShareLink, // 分享链接
      imgUrl: ShareImg, // 分享图标
      success: function () {},
      cancel: function () {}
    })
    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title: ShareTitle, // 分享标题
      desc: ShareDesc, // 分享描述
      link: ShareLink, // 分享链接
      imgUrl: ShareImg, // 分享图标
      success: function () {},
      cancel: function () {}
    })
    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: ShareTitle, // 分享标题
      desc: ShareDesc, // 分享描述
      link: ShareLink, // 分享链接
      imgUrl: ShareImg, // 分享图标
      success: function () {},
      cancel: function () {}
    })
    // 禁止分享
    // wx.hideMenuItems({
    //   menuList: [
    //     'menuItem:share:appMessage',
    //     'menuItem:share:timeline',
    //     'menuItem:share:qq',
    //     'menuItem:share:weiboApp',
    //     'menuItem:favorite',
    //     'menuItem:share:facebook',
    //     'menuItem:share:QZone',
    //     'menuItem:copyUrl',
    //     'menuItem:openWithSafari',
    //     'menuItem:openWithQQBrowser',
    //   ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    // })
  })
}

// 获取链接参数
export const getQuery = () => {
  let q = {}
  location.search && location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
  return q
}

// 是否为带协议或协议自适应的链接
export const isUrl = url => {
  let result = /^http(s)?:\/\//.test(url)
  result || (result = /^\/\//.test(url))
  return result
}

/* eslint-enable */
