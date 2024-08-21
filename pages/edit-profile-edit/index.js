Page({
  data: {
    editType: '',
    inputValue: ''
  },

  onLoad(options) {
    this.setData({
      editType: options.type,
      inputValue: decodeURIComponent(options.value)
    });
  },

  onInputChange(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onSave() {
    // 这里可以发送请求到后端保存数据
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    prevPage.setData({
      [`userInfo.${this.data.editType}`]: this.data.inputValue
    });
    wx.navigateBack({
      success: () => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      }
    });
  }
});