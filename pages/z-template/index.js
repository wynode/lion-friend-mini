const app = getApp();
Page({
  data: {},

  onShow(options) {
    console.log(options);
    // this.getTabBar().init();
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
});
