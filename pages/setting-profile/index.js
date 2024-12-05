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

    showConfirmDialog: false,
  },

  onShow() {
    const myId = wx.getStorageSync('myId');
    app.request(`/ext_user/${myId.ext_user_id}/`, 'GET').then((res) => {
      this.setData({
        item: res,
      });
    });
  },

  // 点击退出登录
  handleLogout() {
    this.setData({
      showConfirmDialog: true,
    });
  },

  // 取消退出
  cancelLogout() {
    this.setData({
      showConfirmDialog: false,
    });
  },

  // 确认退出
  async confirmLogout() {
    try {
      wx.showLoading({
        title: '退出中...',
        mask: true,
      });

      // 清除本地存储的用户信息
      wx.clearStorageSync();

      wx.hideLoading();

      // 显示退出成功提示
      wx.showToast({
        title: '已退出登录',
        icon: 'success',
        duration: 2000,
      });

      // 延迟跳转，确保提示显示完整
      setTimeout(() => {
        // 重定向到登录页面
        wx.reLaunch({
          url: '/pages/login/index', // 替换为你的登录页面路径
        });
      }, 1500);
    } catch (error) {
      console.error('Logout error:', error);
      wx.hideLoading();
      wx.showToast({
        title: '退出失败，请重试',
        icon: 'error',
      });
    } finally {
      this.setData({
        showConfirmDialog: false,
      });
    }
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
