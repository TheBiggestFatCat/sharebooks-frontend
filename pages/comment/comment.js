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

  onLoad() {
    console.log(this.options.openid, this.options.bookCode);
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
      let app = getApp()
      console.log('http://127.0.0.1:8091/shareBook/UserModel/addBookComments/' + this.data.value + '/' + this.options.openid + '/' + app.globalData.nickName + '/' + app.globalData.openid);
      wx.request({
        url: 'http://127.0.0.1:8091/shareBook/UserModel/addBookComments/' + this.data.value + '/' + this.options.bookCode + '/' + app.globalData.nickName + '/' + app.globalData.openid,
        success(res) {
          wx.showToast({
            title: '评论成功',
            complete() {
              wx.navigateTo({
                url: '../bookdetail/bookdetail?id=' + that.options.bookCode,
              })
            }
          })
        }
      })
    }
  },

})