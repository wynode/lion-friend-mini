// index.js
const app = getApp();
const defaultAvatarUrl =
  'https://6175-auto-contract-prob-2d4de24d91c6c-1322285622.tcb.qcloud.la/static/wechat_user.png?sign=63ee26f6f23759983cf23fdd570b8c85&t=1711552862';

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
    console.log('xxx');
  },

  async handleLogin() {
    wx.login({
      success: async (res) => {
        const loginRes = await app.request('/wx_token/', 'POST', {
          code: res.code,
          avatar: this.data.userInfo.avatarUrl,
          nickname: this.data.userInfo.nickName,
          phone: this.data.phoneNumber,
        });
        if (loginRes.access) {
          wx.setStorageSync('access', loginRes.access);
          
          wx.switchTab({
            url: '/pages/my-center/index',
          });
        }
      },
    });
  },

  async handleGetPhoneNumber({ detail }) {
    const res = await app.fetch(`/api/auth/getPhoneNumber/${detail.code}`, { method: 'POST' });

    this.setData({
      phoneNumber: res,
    });
  },
  async onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    const uploadResult = await getApp().cloud.uploadFile({
      cloudPath: `user_avatar/${avatarUrl.split('/').slice(-1)[0]}`,
      filePath: avatarUrl,
    });

    this.setData({
      'userInfo.avatarUrl': app.fileIDToURL(uploadResult.fileID),
    });
  },
  onNickNameChange(e) {
    const nickName = e.detail.value;
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
