const app = getApp();

const swiperList = [
  'https://cdn.luminouscn.com/banner1.jpg',
  'https://cdn.luminouscn.com/banner2.jpg',
  'https://cdn.luminouscn.com/banner3.jpg',
  'https://cdn.luminouscn.com/banner4.jpg',
  'https://cdn.luminouscn.com/banner5.jpg',
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
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,

    swiperList,
    serviceList,
    houseList,

    content: ['用户东成西就成功预定房源！', '用户南帝北丐成功预定房源！', '用户独孤求败成功预定房源！'],
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    // app.request('/official_website/1/', 'GET').then((res) => {
    //   this.setData({ extraInfo: res.extra_info });
    //   const homeImages = res.extra_info.home[0].images;
    //   if (homeImages.length) {
    //     this.setData({
    //       homeImages,
    //     });
    //   }
    // });
  },

  handleGoMenu(e) {
    const { item } = e.currentTarget.dataset;
    if (item.name === '优选合租') {
      wx.navigateTo({
        url: `/pages/house-filter/index?id=${item.id}`,
      }); 
    } else if (item.name === '低龄寄宿') {
      wx.navigateTo({
        url: `/pages/house-filter/index?id=${item.id}`,
      }); 
    } else if (item.name === '学生服务') {
      wx.navigateTo({
        url: `/pages/house-filter/index?id=${item.id}`,
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
