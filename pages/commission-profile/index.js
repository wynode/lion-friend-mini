import { formatTimeX } from '../../utils/util';

const app = getApp();
Page({
  data: {
    tableData: [],
    tableData2: [],
  },

  onShow() {
    this.handleInitPage();
  },

  onLoad() {},

  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  async handleInitPage() {
    const myId = wx.getStorageSync('myId');
    app.request(`/wallet/commission/?ext_user=${myId.ext_user_id}`).then((res) => {
      console.log(res);
      console.log(res.results.filter((item) => item.record_type === 1));
      this.setData({
        tableData: res.results
          .filter((item) => item.record_type === 1)
          .map((item) => {
            return {
              ...item,
              record_time: formatTimeX(item.record_time, 'MM-DD HH:mm'),
            };
          }),
        tableData2: res.results
          .filter((item) => item.record_type === 2)
          .map((item) => {
            return {
              ...item,
              record_time: formatTimeX(item.record_time, 'MM-DD HH:mm'),
            };
          }),
      });
    });
  },
});
