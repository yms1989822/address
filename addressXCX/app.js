//app.js
App({

  data: {
    //这里我在数据库存的是openid
    userid: "123321",

    //服务器地址
    webUrl: 'http://10.1.30.120:8080/medicalrecord/',


    //根据自己的业务来确定需要保存哪些字段
    saveOrUpdateAddress: '{"userid": "{1}", "isdefault": "{2}", "tel": "{3}", "province": "{4}", "city": "{5}", "county": "{6}", "address": "{7}", "mobile": "{8}", "company":"家", "contact": "{9}", "id": "{10}", "cityid": "0", "provinceid": "0", "countyid": "0"}',
   
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})