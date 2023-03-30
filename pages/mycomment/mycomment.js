// pages/location/location.js
let app = getApp()
Page({
  data: {
    commentDetail: [
      {
        commentsInfo: '',
        commentsName: '',
        commentsDate: '',
        bookName: ''
      }
    ]
  },

  onLoad() {
    const that = this
    // 检测登录
    if (!app.haveLogedIn()) {
      return
    }
    
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookCommentsByUnionId/' + app.globalData.openid,
      success(res) {
        let data = res.data
        for (let i in data) {
          data[i].commentsDate = data[i].commentsDate.slice(0, 10)
          wx.request({
            url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookByCode/' + data[i].bookCode,
            success(res) {
              data[i].bookName = res.data[0].bookName
              that.setData({
                commentDetail: data
              })
            },
          })
        }
        console.log(that.data.commentDetail);
      }
    })
  }
})