const app = getApp();
Page({
  data: {
    articleList: [],
    pageNum: 1,
    pageSize: 10,
    hasMore: true,
  },

  onShow(options) {
    console.log(options);
    this.getTabBar().init();
    this.loadArticleList();
  },

  // 上拉触底事件
  onReachBottom() {
    console.log(this.data.hasMore, '---');
    if (this.data.hasMore) {
      this.loadArticleList();
    }
  },

  onLoad() {
    // this.loadArticleList();
  },

  // 加载房源列表
  async loadArticleList() {
    if (!this.data.hasMore) return;
    // 这里替换为你的实际 API 调用
    wx.showLoading();
    const res = await app.request('/community/articles/', 'GET', {
      page: this.data.pageNum,
      page_size: this.data.pageSize,
      // ... 其他可能的参数
    });
    wx.hideLoading();
    const newArticleList = res.results; // 假设 API 返回的数据结构

    this.setData({
      articleList: [...this.data.articleList, ...newArticleList],
      pageNum: this.data.pageNum + 1,
      hasMore: newArticleList.length === this.data.pageSize,
    });
  },

  async onTabsChange(event) {
    const value = event.detail.value;
    if (value === '1') {
      const res = await app.request('/community/articles/?only_follow=true', 'GET', {
        page: 1,
        page_size: 10,
      });
      const newArticleList = res.results; // 假设 API 返回的数据结构

      this.setData({
        articleList: newArticleList,
        pageNum: 1,
        hasMore: newArticleList.length === this.data.pageSize,
      });
    } else {
      const res = await app.request('/community/articles/', 'GET', {
        page: 1,
        page_size: 10,
      });
      const newArticleList = res.results; // 假设 API 返回的数据结构

      this.setData({
        articleList: newArticleList,
        pageNum: 1,
        hasMore: newArticleList.length === this.data.pageSize,
      });
    }
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },
});
