const app = getApp();
Page({
  data: {
    style: 'border: 2rpx solid rgba(220,220,220,1);border-radius: 12rpx;',
    name: '',
    username: '',
    password: '',
    password2: '',
  },

  onLoad() {},

  handleRegister() {
    app
      .request('/register/', 'POST', {
        name: this.data.name,
        username: this.data.username,
        password: this.data.password,
        password_repeat: this.data.password2,
      })
      .then((res) => {
        wx.showToast({
          title: '注册成功, 请登录',
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/index',
          });
        })
      });
  },

  handleUsernameChange(e) {
    const { value } = e.detail;
    this.setData({
      username: value,
    });
  },

  handleGoLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },

  handlePasswordChange(e) {
    const { value } = e.detail;
    this.setData({
      password: value,
    });
  },
  handlenameChange(e) {
    const { value } = e.detail;
    this.setData({
      name: value,
    });
  },

  handlePassword2Change(e) {
    const { value } = e.detail;
    this.setData({
      password2: value,
    });
  },
});
