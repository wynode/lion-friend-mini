const app = getApp();

const swiperList = ['https://cdn.luminouscn.com/house.png', 'https://cdn.luminouscn.com/house1.png'];

Page({
  data: {
    longitude: 103.851959,
    latitude: 1.29027,
    markers: [
      {
        id: 1,
        longitude: 103.851959,
        latitude: 1.29027,
      },
    ],
    userInfo: {
      avatar: '/assets/images/house/header1.png',
      name: '用户_24030113wQ',
      tags: ['房源4', '文章1', '服务'],
    },
    houseInfo: {
      details: [
        {
          label: '月租',
          value: '1500/月',
        },
        {
          label: '出租方式',
          value: '合租',
        },
        {
          label: '房间类型',
          value: '主人房',
        },
        {
          label: '入住时间',
          value: '随时入住',
        },
        {
          label: '面积',
          value: '38.5',
        },
        {
          label: '性质',
          value: '公寓',
        },
      ],
      facilities: [
        {
          image: '/assets/images/house/wy.svg',
          name: '独立卫浴',
        },
        {
          image: '/assets/images/house/kt.svg',
          name: '空调',
        },
        {
          image: '/assets/images/house/wifi.svg',
          name: 'WIFI',
        },
        {
          image: '/assets/images/house/bed.svg',
          name: '床',
        },
        {
          image: '/assets/images/house/yg.svg',
          name: '衣柜',
        },
        {
          image: '/assets/images/house/fs.svg',
          name: '风扇',
        },
        {
          image: '/assets/images/house/zy.svg',
          name: '桌椅',
        },
      ],
      title: '近NTU南阳理工大学~别墅多间主人房',
      desc: '近NTU南阳理工大学～1.2公里…做199只要2个站到学校…199南阳理工大学转一圈出来…还是到我们附近有一个主人房转租一个月！ 想租的请联系我 因本人毕业回国…将现住的别墅主人房短租6.15日～7.18日止33天～一个月1200$…包水电网按天一天60$…高级别墅～环境一流～泳池➕健身房都有…特别安静还可以长租…第一个月还是优惠2+1主人房～可以住2个人…2个人的独立洗手间…独立房间～',
      is_like: true,
      is_collect: false,
    },

    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,

    swiperList,
  },

  onLoad(options) {
    const { id } = options || {};
    console.log(id);
    // app.request(`/course/${id}/`).then((res) => {
    //   const initialTime = Math.floor((res.seconds * res.progress) / 100);
    //   this.setData({
    //     initialTime,
    //     videoInfo: res,
    //     progress: res.progress,
    //     originProgress: res.progress,
    //   });
    // });
  },

  handleMarketTap(e) {
    let latitude = e.detail.latitude;
    let longitude = e.detail.longitude;

    this.setData({
      latitude: latitude,
      longitude: longitude,
    });
  },

  handleHouseUserOpreation(e) {
    const { item } = e.currentTarget.dataset;
    console.log(item);
    if (item === 'like') {
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_like: false },
      });
    } else if (item === 'unLike') {
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_like: true },
      });
    } else if (item === 'collect') {
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_collect: false },
      });
    } else if (item === 'unCollect') {
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_collect: true },
      });
    } else if (item === 'forward') {
      console.log('for');
    }
  },
});
