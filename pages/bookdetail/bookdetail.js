let app = getApp()
Page({
  data: {
    id: 0,
    bookName: '',
    bookAuthor: '',
    shareName: '',
    shareWhere: '',
    bookInformation: '',
    bookFilePath: '',
    commentDetail: []
  },
  onLoad: function() {
    const that = this
    console.log(this.options.id);
    this.setData({
      id: this.options.id
    })
    // 获取书籍详情
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookByCode/' + that.data.id,
      success(res) {
        res.data[0].bookFilePath = res.data[0].bookFilePath.replace(/@/g, '/')
        that.setData({
          bookFilePath: res.data[0].bookFilePath,
          bookName: res.data[0].bookName,
          bookAuthor: res.data[0].bookAuthor,
          shareName: res.data[0].shareName,
          shareWhere: res.data[0].shareWhere,
          bookInformation: res.data[0].bookInformation
        })
      }
    })
    // 获取评论详情
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookCommentsByBookCode/' + that.data.id,
      success(res) {
        for (let i of res.data) {
          i.commentsDate = i.commentsDate.slice(0, 10)
        }
        that.setData({
          commentDetail: res.data
        })
      }
    })
  },
  // 评论
  comment() {
    if (!getApp().haveLogedIn()) {
      return
    }
    wx.navigateTo({
      url: '../comment/comment?openid=' + getApp().globalData.openid + '&bookCode=' + this.data.id,
    })
  },
  // 收藏
  star() {
    const that = this
    if (!app.haveLogedIn()) {
      return
    }
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/addCollection/' + app.globalData.openid + '/' + that.data.id,
      success(res) {
        wx.showToast({
          title: '收藏成功',
        })
      }
    })
  }
})