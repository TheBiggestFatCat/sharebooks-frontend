let app = getApp();
Page({
  data: {
    path: '/assets/images/Add.png',
    logined: false,
    // 书籍封面地址
    url: '',
    // 书名 作者 介绍
    bookName: '',
    bookAuthor: '',
    bookIntro: '',
    imgBase64: ''
  },

  // 检测是否登录
  onShow() {
    this.data.logined = getApp().haveLogedIn()
  },

  // 获取文本
  bindName: function(e) {
    this.setData({
      bookName: e.detail.value
    }) 
  },
  bindAuthor: function(e) {
    this.setData({
      bookAuthor: e.detail.value
    }) 
  },
  bindIntro: function(e) {
    this.setData({
      bookIntro: e.detail.value
    }) 
  },

  //上传
  uploadFileTap() {
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        const img = wx.getFileSystemManager().readFileSync(res.tempFiles[0].tempFilePath, "base64")
        that.setData({
          path: res.tempFiles[0].tempFilePath,
          imgBase64: img
        })
      }
    })
  },

  // 提交
  submit() {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    const that = this
    this.data.logined = app.haveLogedIn()
    if (!this.data.logined) {
      return
    }
    // 上传到图床
    console.log('上传到图床中');
    wx.uploadFile({
      filePath: this.data.path,
      name: 'bookName',
      url: 'https://api.imgbb.com/1/upload',
      formData: {
        'key': '3930c9e890d78db0be347072bdf675e1',
        'image': this.data.imgBase64
      },
      success(res) {
        // 解析图床返回地址 将/转为%2F
        console.log('解析图床返回地址');
        let resData = JSON.parse(res.data).data.image.url
        resData = resData.replace(/\//g, '@')
        that.setData({
          url: resData
        })
        // 存储信息
        console.log('正在存储信息');
        wx.request({
          url: 'http://127.0.0.1:8091/shareBook/UserModel/addBook/' + that.data.bookName + '/' + that.data.bookAuthor + '/' + app.globalData.nickName + '/' + app.globalData.openid + '/' + app.globalData.location + '/' + that.data.bookIntro + '/' + that.data.url,
          success(res) {
            if (res.data == 1) {
              // 提示成功
              console.log('发送提示');
              wx.hideLoading()
              wx.showToast({
                title: '提交成功！',
                icon: 'success'
              })
              that.setData({
                path: '/assets/images/Add.png',
                bookName: '',
                bookAuthor: '',
                bookIntro: ''
              })
              that.onLoad()
            }
          },
          fail(err) {
            console.log(err);
          }
        })
      },
      fail() {
        wx.showToast({
          title: '提交失败！',
          icon: 'error'
        })
      },
    })
  }

})