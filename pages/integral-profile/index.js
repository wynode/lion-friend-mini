const app = getApp();
Page({
  data: {
    tableData: [
      { time: '2024-05-10 22:22:22', source: '转发房源', amount: 5 },
      { time: '2024-05-12 22:22:22', source: '房源预定', amount: 20 },
      { time: '2024-05-14 22:22:22', source: '转发房源', amount: 4 },
      { time: '2024-05-21 22:22:22', source: '发布文章', amount: 2 },
      { time: '2024-05-27 22:22:22', source: '发布文章', amount: 3 }
    ],
    tableData2: [
      { time: '2024-05-10 22:22:22', source: '兑换', amount: -50 },
      { time: '2024-05-12 22:22:22', source: '兑换', amount: -50 },
      { time: '2024-05-14 22:22:22', source: '兑换', amount: 4 },
      { time: '2024-05-21 22:22:22', source: '兑换', amount: 2 },
      { time: '2024-05-27 22:22:22', source: '兑换', amount: 3 }
    ]
  },

  onShow(options) {
    console.log(options);
    // this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
  },

  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  async handleInitPage() {
    app.request(`/course/`).then((res) => {
      this.setData({
        res,
      });
    });
  },
});
