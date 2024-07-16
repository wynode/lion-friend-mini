const app = getApp();

Page({
  data: {
    page: 1,
    pageSize: 10,
    loading: false,
    hasMore: true,
    name: '',

    statusText: '',
    statusValue: [],
    typeText: '',
    typeValue: [],
    statusOptions: [
      { label: '北京市', value: '北京市' },
      { label: '上海市', value: '上海市' },
    ],
    typeOptions: [
      { label: '广州市', value: '广州市' },
      { label: '深圳市', value: '深圳市' },
      { label: '成都市', value: '成都市' },
    ],
    videoListData: [],
  },

  onShow() {
    this.getTabBar().init();
    console.log('onshow');
    // app.request(`/course/?page=1`).then((res) => {
    //   const newList = res.results.map((item) => {
    //     return {
    //       ...item,
    //       title: this.sliceText(item.name, 27),
    //       description: this.sliceText(item.description, 48),
    //     };
    //   });
    //   this.setData({
    //     videoListData: newList,
    //     page: this.data.page,
    //   });
    // });
  },

  onLoad() {},

  getList() {
    if (!this.data.hasMore || this.data.loading) return;
    console.log('onben');
    this.setData({ loading: true });
    app.request(`/course/?page=${this.data.page}`).then((res) => {
      const newList = res.results.map((item) => {
        return {
          ...item,
          title: this.sliceText(item.name, 27),
          description: this.sliceText(item.description, 48),
        };
      });
      this.setData({
        videoListData: this.data.videoListData.concat(newList),
        page: this.data.page + 1,
        loading: false,
        hasMore: newList.length === this.data.pageSize,
      });
    });
  },

  onReachBottom() {
    console.log(222);
    if (this.data.hasMore && !this.data.loading) {
      this.getList();
    }
  },

  onChange({ detail }) {
    console.log(`modelValue: ${detail.value}`);
    app.request(`/course/?name=${detail.value}`).then((res) => {
      console.log(res);
      console.log(this.data.page);
      const newList = res.results.map((item) => {
        return {
          ...item,
          title: this.sliceText(item.name, 27),
          description: this.sliceText(item.description, 48),
        };
      });
      this.setData({
        videoListData: newList,
      });
    });
  },

  sliceText(text, length) {
    if (typeof text === 'string') {
      return text.length > length ? text.slice(0, length) + '...' : text;
    }
    return text;
  },

  onPickerChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;

    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: value.join(' '),
    });
  },

  onPickerCancel(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onStatusPicker() {
    this.setData({ statusVisible: true });
  },

  onTypePicker() {
    this.setData({ typeVisible: true });
  },

  handleVideoTap(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/video-play/index?id=${item.id}`,
    });
  },
});
