const app = getApp();
Page({
  data: {
    style: 'border: 2rpx solid rgba(220,220,220,1);border-radius: 12rpx;',
    username: '',
    password: '',
  },

  onLoad() {},

  handleRegister() {
    wx.navigateTo({
      url: '/pages/register/index',
    });
  },

  handleLogin() {
    app
      .request('/api/token/', 'POST', {
        username: this.data.username,
        password: this.data.password,
      })
      .then((res) => {
        wx.setStorageSync('access', res.access);
        wx.setStorageSync('refresh', res.refresh);
        app
          .request('/student/self/', 'GET')
          .then((user) => {
            wx.setStorageSync('student_id', user.student_id);
            wx.showToast({
              title: '登录成功',
            });
            wx.switchTab({
              url: '/pages/home/index',
            });
          });
      })
      .catch((error) => {
        wx.showToast({
          icon: 'none',
          title: '登陆失败，请检查账号和密码',
        });
      });
  },

  handleUsernameChange(e) {
    const { value } = e.detail;
    this.setData({
      username: value,
    });
  },

  handlePasswordChange(e) {
    const { value } = e.detail;
    this.setData({
      password: value,
    });
  },
});
