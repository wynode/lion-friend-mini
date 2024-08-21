import TabMenu from './data';
Component({
  data: {
    active: 0,
    list: TabMenu,
    visible: false,
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail.value });
      if (this.data.list[event.detail.value].url.includes('publish')) {
        this.setData({
          visible: true,
        });
        return;
      }
      wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith('/')
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
    },

    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },

    handleGoPublish() {
      this.setData({
        visible: false,
      });
      wx.navigateTo({
        url: '/pages/publish-article/index',
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) => (item.url.startsWith('/') ? item.url.substr(1) : item.url) === `${route}`,
      );
      this.setData({ active });
    },
  },
});
