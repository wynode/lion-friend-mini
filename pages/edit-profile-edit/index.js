const app = getApp();

Page({
  data: {
    ext_user_id: 0,
    editType: '',
    inputValue: '',
  },

  onLoad(options) {
    this.setData({
      ext_user_id: options.id,
      editType: options.type,
      inputValue: decodeURIComponent(options.value),
    });
  },

  onInputChange(e) {
    console.log(e);
    this.setData({
      inputValue: e.detail.value,
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onSave() {
    // 这里可以发送请求到后端保存数据
    app
      .request(`/ext_user/${this.data.ext_user_id}/`, 'PATCH', {
        [`${this.data.editType}`]: this.data.inputValue,
      })
      .then((res) => {
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        prevPage.setData({
          [`userInfo.${this.data.editType}`]: this.data.inputValue,
        });
        wx.navigateBack({
          success: () => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
            });
          },
        });
      });
  },
});
