const app = getApp();
Page({
  data: {
    groups: [
      { id: 1, name: '优选合租群', qrCode: 'https://cdn.lzdss.sg/qrcode.jpg' },
      { id: 2, name: '优选合租群', qrCode: 'https://cdn.lzdss.sg/qrcode.jpg' },
      { id: 3, name: '低龄寄宿群', qrCode: 'https://cdn.lzdss.sg/qrcode.jpg' },
      { id: 4, name: '狮城留学群', qrCode: 'https://cdn.lzdss.sg/qrcode.jpg' },
      { id: 5, name: '低龄寄宿群', qrCode: 'https://cdn.lzdss.sg/qrcode.jpg' },
      { id: 6, name: '狮城留学群', qrCode: 'https://cdn.lzdss.sg/qrcode.jpg' },
    ],
    cur: { id: 6, name: '狮城留学群', qrCode: 'https://cdn.lzdss.sg/qrcode.jpg' },
    visible: false,
  },

  onShow(options) {
    console.log(options);
    this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
    // const { item } = e.currentTarget.dataset;
  },

  async handleInitPage() {
    app.request(`/course/`).then((res) => {
      this.setData({
        res,
      });
    });
  },

  previewQR: function (e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);

    // wx.previewImage({
    //   current: url,
    //   urls: [url],
    // });
    this.setData({
      visible: true,
      cur: this.data.groups.filter((item) => item.id == id)[0],
    });
  },

  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
});
