Page({
  data: {
    // 轮播图url
    "bnrUrl": [{
      "url": "https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
    }, {
      "url": "https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
    }, {
      "url": "https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
    }, {
      "url": "https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
    }],
    "newBooks": [],
    "recommendBooks": []
  },

  // 获取搜索
  getSearch(e) {
    this.setData({
      search: e.detail.value
    })
  },

  // 搜索
  search() {
    wx.navigateTo({
      url: '/pages/search/search?data=' + this.data.search,
    })
  },

  // 点击跳转详情
  tapBook(e) {
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id=' + id
    })
  },

  onLoad() {
    const that = this
    console.log('onload');
    // 获取最新共享
    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/selectNewDate',
      success(res) {
        const arr = res.data.reverse().slice(0, 6)
        for (let i of arr) {
          i.bookFilePath = i.bookFilePath.replace(/@/g, '/')
        }
        that.setData({
          newBooks: arr
        })
      },
      fail(err) {
        console.log(err);
      }
    })

    wx.request({
      url: 'http://127.0.0.1:8091/shareBook/UserModel/selectBookRandom',
      success(res) {
        console.log(res.data);
        for (let i of res.data) {
          i.bookFilePath = i.bookFilePath.replace(/@/g, '/')
        }
        that.setData({
          recommandBooks: res.data
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  }
});