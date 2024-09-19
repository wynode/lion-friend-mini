const app = getApp();
Page({
  data: {
    // groups: [
    //   { id: 1, name: '优选合租群', image_url: 'https://cdn.lzdss.sg/image_url.jpg' },
    //   { id: 2, name: '优选合租群', image_url: 'https://cdn.lzdss.sg/image_url.jpg' },
    //   { id: 3, name: '低龄寄宿群', image_url: 'https://cdn.lzdss.sg/image_url.jpg' },
    //   { id: 4, name: '狮城留学群', image_url: 'https://cdn.lzdss.sg/image_url.jpg' },
    //   { id: 5, name: '低龄寄宿群', image_url: 'https://cdn.lzdss.sg/image_url.jpg' },
    //   { id: 6, name: '狮城留学群', image_url: 'https://cdn.lzdss.sg/image_url.jpg' },
    // ],
    groups: [],
    cur: { id: 6, name: '狮城留学群', image_url: 'https://cdn.lzdss.sg/image_url.jpg' },
    visible: false,
  },

  onShow(options) {
    console.log(options);
    this.getTabBar().init();
    this.handleInitPage();
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
    // const { item } = e.currentTarget.dataset;
  },

  async handleInitPage() {
    app.request(`/community/groups/?page=1&page_size=100`).then((res) => {
      this.setData({
        groups: res.results,
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
