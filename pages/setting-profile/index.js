Page({
  data: {
    privacySettings: {
      viewPosts: true,
      viewFavorites: false,
      viewLikes: true,
      viewFollowers: true
    }
  },

  onSwitchChange(e) {
    const { key } = e.currentTarget.dataset;
    const value = e.detail.value;
    
    this.setData({
      [`privacySettings.${key}`]: value
    });

    // 这里可以添加将设置保存到服务器的逻辑
    console.log(`Privacy setting '${key}' changed to: ${value}`);
  }
});