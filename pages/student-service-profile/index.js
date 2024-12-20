const app = getApp();
Page({
  data: {
    services: [],
    showDialog: false,
    dialogItem: { mobile: '', wechat_id: '' },
  },

  onShow(options) {
    console.log(options);
    // this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
    const { id } = options || {};
    this.handleInitPage(id);
  },

  async handleInitPage(id) {
    const res = await app.request(`/student_service/?service_type=${id}`,  'GET', { page_size: 100 });
    console.log(res);
    if (res.results && res.results[0]) {
      wx.setNavigationBarTitle({
        title: res.results[0].service_type_display
      });
    }
    this.setData({
      services: res.results,
    });
  },

  onConnectTap(e) {
    const service = e.currentTarget.dataset.service;
    wx.navigateTo({
      url: `/pages/student-service-contact/index?id=${service.id}`,
    })
    console.log('Service tapped:', service);
    // this.setData({
    //   dialogItem: {
    //     mobile: service.mobile,
    //     wechat_id: service.wechat_id
    //   },
    //   showDialog: true,
    // });
  },
  onPhoneTap() {
    wx.setClipboardData({
      data: this.data.dialogItem.mobile,
      success: function (res) {
        wx.showToast({
          title: '复制电话成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '复制电话失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },
  onWechatTap() {
    wx.setClipboardData({
      data: this.data.dialogItem.wechat_id,
      success: function (res) {
        wx.showToast({
          title: '复制微信成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '复制微信失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },

  closeDialog() {
    this.setData({
      showDialog: false,
    });
  },
});
