const app = getApp();
Page({
  data: {
    services: [],
    showDialog: false,
    formData: {
      name: '',
      gender: 'male',
      age: '',
      phone: '',
    },
    modelId: '',
    visible: false,
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
    const res = await app.request(`/student_service/fucking_model/?fucking_student_service=${id}`,  'GET', { page_size: 100 });
    console.log(res);
    if (res.results && res.results[0]) {
      wx.setNavigationBarTitle({
        title: res.results[0].fucking_student_service_display
      });
    }
    this.setData({
      services: res.results,
    });
  },

  onConnectTap(e) {
    const service = e.currentTarget.dataset.service;
    console.log('Service tapped:', service);
    this.setData({
      dialogItem: {
        mobile: service.mobile,
        wechat_id: service.wechat_id
      },
      showDialog: true,
    });
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

  showPopup(e) {
    const service = e.currentTarget.dataset.service;
    console.log('Service tapped:', service);
    this.setData({ visible: true, modelId: service.id });
  },

  closePopup() {
    this.setData({ visible: false });
  },

  onVisibleChange({ detail }) {
    this.setData({ visible: detail.visible });
  },

  onVisible2Change(e) {
    this.setData({
      visible2: e.detail.visible,
    });
  },

  onNameChange(e) {
    this.setData({ 'formData.name': e.detail.value });
  },

  onGenderChange(e) {
    this.setData({ 'formData.gender': e.detail.value });
  },

  onAgeChange(e) {
    this.setData({ 'formData.age': e.detail.value });
  },

  onPhoneChange(e) {
    this.setData({ 'formData.phone': e.detail.value });
  },

  async submitForm() {
    console.log('提交的表单数据：', this.data.formData);
    if (this.data.formData.age < 10 || this.data.formData.age > 100) {
      wx.showToast({
        title: '请填入正确的年龄',
        icon: 'none',
      });
      return;
    }
    if (this.data.formData.name.length < 2) {
      wx.showToast({
        title: '请填入正确的姓名',
        icon: 'none',
      });
      return;
    }
    try {
      wx.showLoading();
      const res = await app.request(`/student_service/fucking_form/`, 'POST', {
        fucking_name: this.data.formData.name,
        fucking_gender: this.data.formData.gender,
        fucking_age: this.data.formData.age,
        fucking_mobile: this.data.formData.phone,
        fucking_model: this.data.modelId
      });
      // await app.request('/wallet/auto_compute/', 'POST', {
      //   // order_id: res.id,
      //   parent: this.data.parent,
      //   second_parent: this.data.second_parent,
      //   action: 'order',
      //   [`${this.data.houstType}_order_id`]: res.id,
      // });
      wx.showToast({
        title: '提交成功',
      });
      this.closePopup();
      wx.hideLoading();
    } catch {
      wx.hideLoading();
    }

    // 这里可以添加表单验证逻辑
    // 如果验证通过，可以发送请求到服务器
  },
});
