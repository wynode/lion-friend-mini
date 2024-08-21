Page({
  data: {
    userInfo: {
      avatar: '/assets/images/my/user-avatar.png',
      nickname: '肥嘟嘟左卫门',
      description: '个性签名介绍，最多100个字个性签名介绍，最多100个字个性签名介绍...',
      phone: '18810086677'
    }
  },

  onEditAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        // 这里可以上传头像到服务器，然后更新 userInfo
        this.setData({
          'userInfo.avatar': tempFilePath
        });
      }
    });
  },

  onEditNickname() {
    wx.navigateTo({
      url: '/pages/profile-edit/profile-edit?type=nickname&value=' + this.data.userInfo.nickname
    });
  },

  onEditDescription() {
    wx.navigateTo({
      url: '/pages/profile-edit/profile-edit?type=description&value=' + encodeURIComponent(this.data.userInfo.description)
    });
  },

  onEditPhone() {
    wx.getPhoneNumber({
      success: (res) => {
        // 这里需要将加密的手机号发送到后端解密
        console.log('获取手机号成功', res);
      },
      fail: (err) => {
        console.error('获取手机号失败', err);
      }
    });
  }
});