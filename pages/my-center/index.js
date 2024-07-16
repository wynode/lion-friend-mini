const app = getApp();

const mockUserInfo = {
  name: '肥嘟嘟左卫门 ',
  id: 'zq124ss421 ',
  ip: '新加坡',
  desc: '个性签名介绍，最多100个字个性签名介绍，最多100个字个性签名介绍，最多100个字个性签名介绍，最多100个字个性签名介绍最多100个字个性签名介绍。',
};

const mockUserStatis = [
  { label: '关注', value: '17' },
  { label: '粉丝', value: '32' },
  { label: '积分', value: '25' },
  { label: '佣金', value: '55.00' },
];

Page({
  data: {
    userInfo: mockUserInfo,
    userStatis: mockUserStatis,
  },

  onShow(options) {
    console.log(options);
    this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
  },

  async handleInitPage() {
    app.request(`/course/`).then((res) => {
      this.setData({
        res,
      });
    });
  },

  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsChange1(event) {
    this.setData({
      value: event.detail.value,
    });
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick1(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },
});
