// pages/location/location.js
Page({
  data: {
    value: "",
    logined: false
  },
  // 检测是否登录
  onShow() {
    this.data.logined = getApp().haveLogedIn()
  },

  bindTextAreaBlur: function(e) {
    this.setData({
      value:e.detail.value
    }) 
  },
  formSubmit: function(e) {
    console.log(this.data.value);
    const that = this
    if (getApp().haveLogedIn() && that.data.value != '') {
      console.log('http://127.0.0.1:8091/shareBook/UserModel/alterUserShareWhere/' + getApp().globalData.openid + '/' + that.data.value);
      wx.request({
        url: 'http://127.0.0.1:8091/shareBook/UserModel/alterUserShareWhere/' + getApp().globalData.openid + '/' + this.data.value,
        success(res) {
          wx.showToast({
            title: '修改成功',
          })
        }
      })
    }
  },

})