let app = getApp()
Page({
  data: {
  listData:[]
  },

  onReady() {
    const that = this
    that.setData({
      listData: []
    })
    let listData = this.data.listData
    if (app.haveLogedIn()) {
      wx.request({
        url: 'http://127.0.0.1:8091/shareBook/UserModel/selectCollectionByUnionId/' + app.globalData.openid,
        success(res) {
          console.log(res.data);
          for (let i of res.data) {
            const collectionId = i.collectionId
            wx.request({
              url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookByCode/' + i.bookCode,
              success(res) {
                res.data[0].bookFilePath = res.data[0].bookFilePath.replace(/@/g, '/')
                console.log(res.data);
                listData.push({
                  bookFilePath: res.data[0].bookFilePath,
                  bookName: res.data[0].bookName,
                  bookCode: res.data[0].bookCode,
                  collectionId: collectionId
                })
                that.setData({
                  listData: listData
                })
              }
            })
          }
        }
      })
    }
  },

  lookDetail(e) {
    // 根据bookCode跳转
    const id = e.currentTarget.dataset['index']
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id=' + id
    })
  },

  delate(e) {
    const that = this
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/deleteCollection/' + e.currentTarget.dataset.id,
      success(res) {
        that.onReady()
      }
    })
  }
  
 })