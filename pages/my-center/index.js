import { formatTime } from '../../utils/util'
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

const houseList = [
  {
    id: 1,
    image: 'https://cdn.luminouscn.com/house.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 2,
    image: 'https://cdn.luminouscn.com/house1.png',
    title: '整租精装公寓',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '3500',
    tags: ['112.52㎡', '整租', '公寓', '普通房'],
  },
  {
    id: 3,
    image: 'https://cdn.luminouscn.com/house.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 4,
    image: 'https://cdn.luminouscn.com/house1.png',
    title: '豪华联排别墅',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '25000',
    tags: ['338.52㎡', '整租', '别墅', '普通房'],
  },
];

Page({
  data: {
    userInfo: mockUserInfo,
    userStatis: mockUserStatis,
    houseList,
    date: formatTime('2024-07-25T20:53:41.582552+08:00'),
    articleList: [
      {
        id: 1,
        image: 'https://cdn.luminouscn.com/article1.png',
        title: '🇸🇬 新加坡租房怎么选？如何找到好的房源？',
        authorAvatar: '/assets/images/my/user-avatar.png',
        authorName: '肥嘟嘟左卫门',
        likeCount: 7,
      },
      {
        id: 2,
        image: 'https://cdn.luminouscn.com/article2.png',
        title: '在新加坡读书我找到了有一种家的归属感',
        authorAvatar: '/assets/images/my/user-avatar.png',
        authorName: '肥嘟嘟左卫门',
        likeCount: 14,
      },
      {
        id: 3,
        image: 'https://cdn.luminouscn.com/article2.png',
        title: '在新加坡读书我找到了有一种家的归属感',
        authorAvatar: '/assets/images/my/user-avatar.png',
        authorName: '肥嘟嘟左卫门',
        likeCount: 14,
      },
    ],
    currentTab: 0,
  },

  onShow(options) {
    console.log(options);
    this.getTabBar().init();
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
    this.handleInitPage();
  },

  async handleInitPage() {
    app.request('/curated_shared_rental/?page=1&page_size=4', 'GET').then((res) => {
      this.setData({ houseList: res.results });
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

  handleGoHouseProfile(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/house-profile/index?id=${item.id}`,
    });
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
