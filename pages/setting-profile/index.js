const app = getApp();

Page({
  data: {
    // privacySettings: {
    //   viewPosts: true,
    //   viewFavorites: false,
    //   viewLikes: true,
    //   viewFollowers: true
    // },
    item: {
      show_publish: true,
      show_followers_and_following: true,
      show_favorite: true,
      show_like: true,
    },
  },

  onShow() {
    const myId = wx.getStorageSync('myId');
    app.request(`/ext_user/${myId.ext_user_id}/`, 'GET').then((res) => {
      this.setData({
        item: res,
      });
    });
  },

  onSwitchChange(e) {
    const { key } = e.currentTarget.dataset;
    const value = e.detail.value;
    const myId = wx.getStorageSync('myId');
    console.log(myId);

    this.setData({
      [`item.${key}`]: value,
    });
    app.request(`/ext_user/${myId.ext_user_id}/`, 'PATCH', {
      [`${key}`]: value,
    });

    // 这里可以添加将设置保存到服务器的逻辑
    console.log(`Privacy setting '${key}' changed to: ${value}`);
  },
});
