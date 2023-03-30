// pages/search/search.js
Page({
  data: {
    books: []
  },

  onLoad(options) {
    const that = this
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookByName/' + options.data,
      success(res) {
        for (let i in res.data)
        wx.request({
          url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookByCode/' + res.data[i].bookCode,
          success(res) {
            console.log(res);
            res.data[0].bookFilePath = res.data[0].bookFilePath.replace(/@/g, '/')
            that.setData({
              ['books[' + i + ']']: res.data[0]
            })
          }
        })
      }
    })
  },

  toDetail(e) {
    const id = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '/pages/bookdetail/bookdetail?id=' + id,
    })
  }

})