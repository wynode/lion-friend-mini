const app = getApp();

const swiperList = [
  'https://cdn.luminouscn.com/banner-01.png',
  'https://cdn.luminouscn.com/banner-02.png',
  'https://cdn.luminouscn.com/banner-03.png',
  'https://cdn.luminouscn.com/banner-04.png',
  'https://cdn.luminouscn.com/banner-05.png',
  // '/assets/images/banner/banner1.jpg',
  // '/assets/images/banner/banner2.jpg',
  // '/assets/images/banner/banner3.jpg',
  // '/assets/images/banner/banner4.jpg',
  // '/assets/images/banner/banner5.jpg',
];

const serviceList = [
  {
    id: 1,
    image: '/assets/images/house/sharing.png',
    name: '优选合租',
    desc: '多种优质真实房源',
  },
  {
    id: 2,
    image: '/assets/images/house/apartment.png',
    name: '低龄寄宿',
    desc: '多种优质真实房源',
  },
  {
    id: 3,
    image: '/assets/images/house/service.png',
    name: '学生服务',
    desc: '多种优质真实房源',
  },
  {
    id: 4,
    image: '/assets/images/house/integral.png',
    name: '积分介绍',
    desc: '多种优质真实房源',
  },
];

Page({
  data: {
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,

    swiperList,
    serviceList,
    houseList: [],
    pageNum: 1,
    pageSize: 10,
    hasMore: true,

    content: ['用户东成西就成功预定房源！', '用户南帝北丐成功预定房源！', '用户独孤求败成功预定房源！'],
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.loadHouseList();

    app.request('/index_notify/', 'GET').then((res) => {
      this.setData({ content: res });
    });
  },

  // 上拉触底事件
  onReachBottom() {
    console.log(this.data.hasMore, '---');
    if (this.data.hasMore) {
      this.loadHouseList();
    }
  },

  // 加载房源列表
  async loadHouseList() {
    if (!this.data.hasMore) return;

    // 这里替换为你的实际 API 调用
    const res = await app.request('/curated_shared_rental/', 'GET', {
      page: this.data.pageNum,
      page_size: this.data.pageSize,
      // ... 其他可能的参数
    });
    const newHouseList = res.results; // 假设 API 返回的数据结构

    this.setData({
      houseList: [...this.data.houseList, ...newHouseList],
      pageNum: this.data.pageNum + 1,
      hasMore: newHouseList.length === this.data.pageSize,
    });
  },

  handleGoMenu(e) {
    const { item } = e.currentTarget.dataset;
    if (item.name === '优选合租') {
      wx.navigateTo({
        url: `/pages/house-filter/index?type=shared_rental`,
      });
    } else if (item.name === '低龄寄宿') {
      wx.navigateTo({
        url: `/pages/house-filter/index?type=host_family`,
      });
    } else if (item.name === '学生服务') {
      wx.navigateTo({
        url: `/pages/student-service/index?id=${item.id}`,
      });
    } else if (item.name === '积分介绍') {
      wx.navigateTo({
        url: `/pages/house-points/index?id=${item.id}`,
      });
    }
  },

  handleGoHouseProfile(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/house-profile/index?id=${item.id}`,
    });
  },

  onTap(e) {
    const { index } = e.detail;

    console.log(index);
  },
});
