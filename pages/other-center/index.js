import { formatTime } from '../../utils/util';
const app = getApp();

Page({
  data: {
    ext_user_id: 0,
    userInfo: {},
    userStatis: [],
    houseList: [],
    date: formatTime('2024-07-25T20:53:41.582552+08:00'),
    articleList: [],
    currentTab: 0,
  },

  onShow(options) {
    this.handleInitPage();
  },

  switchTab(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      currentTab: index,
    });
    // 这里可以添加切换标签页时的其他逻辑
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
    // this.handleInitPage();
  },

  async handleInitPage() {
    wx.showLoading();
    const otherId = wx.getStorageSync('otherId');
    this.setData({
      ext_user_id: otherId,
    });
    console.log(otherId);
    app.request(`/ext_user/${otherId}/`, 'GET').then((res) => {
      this.setData({
        userInfo: res,
        userStatis: [
          { label: '关注', value: res.following_count },
          { label: '粉丝', value: res.follower_count },
          // { label: '积分', value: res.score_points },
          // { label: '佣金', value: res.commission },
        ],
      });
      wx.hideLoading();
      setTimeout(() => {
        this.onTabsChange();
      }, 500);
    });
  },

  handleProfileClick(e) {
    const { item } = e.currentTarget.dataset;
    if (item.label === '积分') {
      wx.navigateTo({
        url: '/pages/integral-profile/index',
      });
    }
  },

  handleGoEdit() {
    wx.navigateTo({
      url: `/pages/edit-profile/index`,
    });
  },

  handleGoSetting() {
    wx.navigateTo({
      url: `/pages/setting-profile/index`,
    });
  },

  async onTabsChange(event = { detail: {} }) {
    const { value } = event.detail;

    let sharedIds = this.data.userInfo.deployed_shared_rental || [];
    let hostingIds = this.data.userInfo.deployed_host_family || [];
    let articleIds = this.data.userInfo.deployed_service || [];

    if (value === '1') {
      sharedIds = this.data.userInfo.favorite_shared_rental;
      hostingIds = this.data.userInfo.favorite_host_family;
      articleIds = this.data.userInfo.favorite_service;
    } else if (value === '2') {
      sharedIds = this.data.userInfo.liked_shared_rental;
      hostingIds = this.data.userInfo.liked_host_family;
      articleIds = this.data.userInfo.liked_service;
    }
    let houseList1 = [];
    if (sharedIds.length) {
      const res1 = await app.request('/shared_rental/', 'GET', {
        page: 1,
        page_size: 100,
        ids: sharedIds.join(','),
      });
      houseList1 = res1.results;
    }
    let houseList2 = [];
    if (hostingIds.length) {
      const res2 = await app.request('/host_family/', 'GET', {
        page: 1,
        page_size: 100,
        ids: hostingIds.join(','),
      });
      houseList2 = res2.results;
    }
    let articleList = [];
    if (articleIds.length) {
      const res3 = await app.request('/community/articles/', 'GET', {
        page: 1,
        page_size: 100,
        ids: articleIds.join(','),
      });
      articleList = res3.results;
    }
    this.setData({
      houseList: [...houseList1, ...houseList2],
      articleList,
    });
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },
});
