import handleFileInUpload from '../../common/cosUpload';

const app = getApp();

Page({
  data: {
    userInfo: {},
    ext_user_id: 0,
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
    this.handleInitPage();
  },

  async handleInitPage() {
    // app.request('/my_user_id/', 'GET').then((res) => {
    //   this.setData({
    //     ext_user_id: res.ext_user_id,
    //   });
    const myId = wx.getStorageSync('myId');
    this.setData({
      ext_user_id: myId.ext_user_id,
    });
    app.request(`/ext_user/${myId.ext_user_id}/`, 'GET').then((res) => {
      this.setData({ userInfo: res });
    });
    // });
  },

  async onEditAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: async (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        // 这里可以上传头像到服务器，然后更新 userInfo

        console.log(res);
        try {
          wx.showLoading();
          const url = await handleFileInUpload(tempFilePath.slice(-18), tempFilePath);
          app.request(`/ext_user/${this.data.ext_user_id}/`, 'PATCH', {
            avatar_url: url,
          });
          this.setData({
            'userInfo.avatar_url': url,
          });
          wx.hideLoading();
        } catch {
          wx.hideLoading();
          wx.showToast({
            icon: 'error',
            title: '上传图片出错，请联系管理员',
          });
        }
      },
    });
  },

  onEditNickname() {
    wx.navigateTo({
      url:
        `/pages/edit-profile-edit/index?id=${this.data.ext_user_id}&type=nickname&value=` + this.data.userInfo.nickname,
    });
  },

  onEditDescription() {
    wx.navigateTo({
      url:
        `/pages/edit-profile-edit/index?id=${this.data.ext_user_id}&type=profile&value=` +
        encodeURIComponent(this.data.userInfo.profile),
    });
  },

  onEditPhone() {
    wx.navigateTo({
      url: `/pages/edit-profile-edit/index?id=${this.data.ext_user_id}&type=mobile&value=` + this.data.userInfo.mobile,
    });
    // wx.getPhoneNumber({
    //   success: (res) => {
    //     // 这里需要将加密的手机号发送到后端解密
    //     console.log('获取手机号成功', res);
    //   },
    //   fail: (err) => {
    //     console.error('获取手机号失败', err);
    //   },
    // });
  },
});
