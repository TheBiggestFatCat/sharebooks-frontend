let app = getApp()
Page({
  data: {
    listData:[]
  },

  onLoad() {
    const that = this
    if (app.haveLogedIn()) {
      wx.request({
        url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookByUnionId/' + app.globalData.openid,
        success(res) {
          for (let i of res.data) {
            i.bookFilePath = i.bookFilePath.replace(/@/g, '/')
          }
          console.log(res.data);
          that.setData({
            listData: res.data
          })
        }
      })
    }
  },

  cancelShare(e) {
    const that = this
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/deleteBook/' + e.currentTarget.dataset['index'],
      success(res) {
        wx.showToast({
          title: '删除成功',
        })
        that.onLoad()
      }
    })
  }
  
 })