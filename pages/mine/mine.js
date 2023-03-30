// pages/mine/mine.js
Page({
  data: {
    openid: '',
    session_key: '',
    nickName: '未登录',
    avatarUrl: '',
    logined: false
  },

  // 检测是否登录
  onShow() {
    let gData = getApp().globalData
  },

  // 跳转函数
  gotoMycomment() {
    wx.navigateTo({
      url: '../mycomment/mycomment',
    })
  },
  gotoMyshare() {
    wx.navigateTo({
      url: '../myshare/myshare',
    })
  },
  gotoMystar() {
    wx.navigateTo({
      url: '../mystar/mystar',
    })
  },
  gotoLocation() {
    wx.navigateTo({
      url: '../location/location',
    })
  },

  // 登录
  login() {
    const that = this
    console.log('正在登录');
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://127.0.0.1:8091/shareBook/UserModel/weChatLogin/' + res.code,
            success(res) {
              that.setData({
                openid: res.data.openid,
                session_key: res.data.session_key
              })
              wx.request({
                url: 'http://127.0.0.1:8091/shareBook/UserModel/selectUserByUnionId/' + that.data.openid,
                success(res) {
                  console.log(res.data.shareWhere);
                  getApp().globalData.location = res.data.shareWhere
                  console.log(getApp().globalData);
                }
              })
            },
            fail(err) {
              console.log(err.errMsg)
            }
          })
        }
      } 
    })
    wx.getUserProfile({
      desc: '获取用户头像与昵称',
      success(res) {
        that.setData({
          logined: true
        })
        console.log(that.data.openid);
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl         
        })
        let app = getApp();
        app.globalData.openid = that.data.openid;
        app.globalData.nickName = that.data.nickName;
        app.globalData.avatarUrl = that.data.avatarUrl;
        app.globalData.session_key = that.data.session_key;
        // 查询用户信息（是否已经注册）
        wx.request({
          url: 'http://127.0.0.1:8091/shareBook/UserModel/selectUserByUnionId/' + app.globalData.openid,
          success(res) {
            // 如果没有查询到用户就新增用户信息
            if(!res.data) {
              wx.request({
                url: 'http://127.0.0.1:8091/shareBook/UserModel/addUser/' + app.globalData.openid + '/未知',
                success(res) {
                  console.log(res);
                },
                fail(err) {
                  console.log(err);
                }
              })
            }
          }
        })

      }
    })
  },
})