// index.js
import handleFileInUpload from '../../common/cosUpload';

const app = getApp();
const defaultAvatarUrl =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
Page({
  data: {
    style: 'border-radius: 12rpx;',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    phoneNumber: '',
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    isChecked: false,
  },

  async onLoad() {
    // this.getUserProfile();
  },

  async handleLogin() {
    wx.login({
      success: async (res) => {
        try {
          wx.showLoading();
          const payload = {
            code: res.code,
            nickname: this.data.userInfo.nickName,
            phone: this.data.phoneNumber,
            mobile: this.data.phoneNumber,
          };
          const loginRes = await app.request('/wx_token/', 'POST', payload);
          if (loginRes.access) {
            wx.setStorageSync('access', loginRes.access);
            const myId = await app.request('/my_user_id/', 'GET');
            const tempFilePath = this.data.userInfo.avatarUrl;
            const url = await handleFileInUpload(tempFilePath.slice(-18), tempFilePath);
            await app.request(`/ext_user/${myId.ext_user_id}/`, 'PATCH', {
              avatar_url: url,
            });
            const isProfile = wx.getStorageSync('isProfile');
            if (isProfile) {
              wx.setStorageSync('isProfile', false);
              wx.navigateBack();
            } else {
              wx.switchTab({
                url: '/pages/my-center/index',
              });
            }
          }
        } catch {
          wx.hideLoading();
        }
      },
    });
  },

  async handleGetPhoneNumber({ detail }) {
    const res = await app.request(`/getuserphonenumber/?code=${detail.code}`);

    this.setData({
      phoneNumber: res.phone_info.phoneNumber,
    });
  },

  async onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    // const uploadResult = await getApp().cloud.uploadFile({
    //   cloudPath: `user_avatar/${avatarUrl.split('/').slice(-1)[0]}`,
    //   filePath: avatarUrl,
    // });
    // const tempFilePath = avatarUrl;
    // 这里可以上传头像到服务器，然后更新 userInfo

    // console.log(res);

    this.setData({
      'userInfo.avatarUrl': avatarUrl,
    });
  },

  onNickNameChange(e) {
    const nickName = e.detail.value;
    console.log(nickName);
    this.setData({
      'userInfo.nickName': nickName,
    });
  },
  handleCheckedChange() {
    this.setData({
      isChecked: !this.data.isChecked,
    });
  },

  handleGoAgreement() {
    wx.openEmbeddedMiniProgram({
      appId: 'wxd45c635d754dbf59',
      path: `pages/detail/detail?url=https://docs.qq.com/doc/DWVh6VlNFa2ZvZUNX`,
    });
  },

  onPhoneNumberChange(e) {
    const phoneNumber = e.detail.value;
    this.setData({
      phoneNumber: phoneNumber,
    });
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: async (res) => {
        // console.log(res);
        // const uploadResult = await getApp().cloud.uploadFile({
        //   cloudPath: `user_avatar/test1.png`,
        //   filePath: res.userInfo.avatarUrl,
        // });
        this.setData({
          userInfo: res.userInfo,
        });
      },
    });
  },
});
