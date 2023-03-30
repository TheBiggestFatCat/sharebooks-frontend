// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  // 全局变量
  globalData: {
    openid: '',
    session_key: '',
    nickName: '未登录',
    avatarUrl: '',
    location: '未设置'
  },

  // 检测是否登录的函数
  haveLogedIn() {
    if (this.globalData.openid) {
      return true
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1000
      })
      return false
    }
  }

})
