const app = getApp();

const facilityImageMap = {
  独立卫浴: '/assets/images/house/dlwy.svg',
  公共卫浴: '/assets/images/house/ggwy.svg',
  热水器: '/assets/images/house/rsq.svg',
  空调: '/assets/images/house/kt.svg',
  风扇: '/assets/images/house/fs.svg',
  WIFI: '/assets/images/house/wifi.svg',
  微波炉: '/assets/images/house/wbl.svg',
  电磁炉: '/assets/images/house/dcl.svg',
  烤箱: '/assets/images/house/kx.svg',
  冰箱: '/assets/images/house/bx.svg',
  洗衣机: '/assets/images/house/xyj.svg',
  烘干机: '/assets/images/house/hgj.svg',
  橱柜: '/assets/images/house/cg.svg',
  床: '/assets/images/house/bed.svg',
  衣橱: '/assets/images/house/yg.svg',
  椅子: '/assets/images/house/yz.svg',
  桌子: '/assets/images/house/zy.svg',
};


// 转换函数
function convertToFacilities(roomFacilities) {
  return roomFacilities.map((facility) => ({
    image: facilityImageMap[facility] || '/assets/images/house/default.svg', // 使用默认图片如果没有匹配
    name: facility,
  }));
}

function extractDetails(houseData) {
  const details = [
    {
      label: '月租',
      value: `${houseData.price}/月`,
    },
    {
      label: '出租方式',
      value: houseData.rental_type_cn,
    },
    {
      label: '房间类型',
      value: houseData.room_type_cn,
    },
    {
      label: '入住时间',
      value: houseData.check_in_date.slice(-5),
    },
    {
      label: '面积',
      value: `${houseData.area}㎡`,
    },

    {
      label: '性质',
      value: houseData.property_type_cn,
    },
    {
      label: '楼层',
      value: `${houseData.floor}层`,
    },
    {
      label: '最短租期',
      value: `${houseData.min_of_months}个月`,
    },
  ];

  // 过滤掉值为空或未知的项
  return details.filter((item) => item.value && item.value !== '未知' && item.value !== '0层');
}

Page({
  data: {
    longitude: 103.851959,
    latitude: 1.29027,
    markers: [
      {
        id: 1,
        longitude: 103.851959,
        latitude: 1.29027,
        iconPath: '/assets/images/house/mark.svg',
        joinCluster: true,
        width: 36,
        height: 39,
      },
    ],
    userInfo: {
      avatar: '/assets/images/house/header1.png',
      name: '用户_24030113wQ',
      tags: ['房源4', '文章1', '服务'],
    },
    houseInfo: {
      location: {
        lat: 1.337354,
        lng: 103.75288,
      },
      markers: [
        {
          id: 1,
          longitude: 103.851959,
          latitude: 1.29027,
        },
      ],
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

      title: '近NTU南阳理工大学~别墅多间主人房',
      desc: '近NTU南阳理工大学～1.2公里…做199只要2个站到学校…199南阳理工大学转一圈出来…还是到我们附近有一个主人房转租一个月！ 想租的请联系我 因本人毕业回国…将现住的别墅主人房短租6.15日～7.18日止33天～一个月1200$…包水电网按天一天60$…高级别墅～环境一流～泳池➕健身房都有…特别安静还可以长租…第一个月还是优惠2+1主人房～可以住2个人…2个人的独立洗手间…独立房间～',
      is_like: true,
      is_collect: false,
    },

    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,

    houstType: 'shared_rental',
    visible: false,
    formData: {
      name: '',
      gender: 'male',
      age: '',
      phone: '',
    },
    visible2: false,
  },

  onShareAppMessage() {
    return {
      title: '快来看！我在星辉租房发现一套非常棒的房源！',
      path: '/pages/house-profile/index?id=1001',
      // imageUrl: '/path/to/your/share-image.png'  // 可选，自定义转发的图片
    };
  },

  onShareTimeline() {
    return {
      title: '快来看！我在星辉租房发现一套非常棒的房源！',
      query: 'id=1001',
      // imageUrl: '/path/to/your/share-image.png'  // 可选，自定义转发的图片
    };
  },

  async onLoad(options) {
    const { id, type } = options || {};
    console.log(id);
    let res = {};
    if (type === 'hosting') {
      this.setData({ houstType: 'host_family' });
      res = await app.request(`/host_family/${id}/`);
    } else {
      this.setData({ houstType: 'shared_rental' });
      res = await app.request(`/shared_rental/${id}/`);
    }
    this.setData({
      houseInfo: {
        ...res,
        facilities: convertToFacilities(res.room_facility),
        details: extractDetails(res),
        is_like: res.is_current_like,
        is_collect: res.is_current_favorite,
      },
      markers: [
        {
          id: 1,
          longitude: res.location.lng || this.data.longitude,
          latitude: res.location.lat || this.data.latitude,
          iconPath: '/assets/images/house/mark.svg',
          joinCluster: true,
          width: 40,
          height: 44,
        },
      ],
      userInfo: {
        ...res.deployer_data,
        tags: [
          `房源${res.deployer_data.host_family_count + res.deployer_data.shared_rental_count}`,
          `文章${res.deployer_data.student_service_count}`,
        ],
      },
    });
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
      app.request(`/${this.data.houstType}/${this.data.houseInfo.id}/like/`, 'POST');
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_like: false },
      });
      wx.showToast({
        icon: 'none',
        title: '取消点赞成功',
      });
    } else if (item === 'unLike') {
      app.request(`/${this.data.houstType}/${this.data.houseInfo.id}/like/`, 'POST');
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_like: true },
      });
      wx.showToast({
        icon: 'none',
        title: '点赞成功',
      });
    } else if (item === 'collect') {
      app.request(`/${this.data.houstType}/${this.data.houseInfo.id}/favorite/`, 'POST');
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_collect: false },
      });
      wx.showToast({
        icon: 'none',
        title: '取消收藏成功',
      });
    } else if (item === 'unCollect') {
      app.request(`/${this.data.houstType}/${this.data.houseInfo.id}/favorite/`, 'POST');
      this.setData({
        houseInfo: { ...this.data.houseInfo, is_collect: true },
      });
      wx.showToast({
        icon: 'none',
        title: '添加收藏成功',
      });
    } else if (item === 'forward') {
      this.setData({ visible2: true });
      console.log('for');
    }
  },

  showPopup() {
    this.setData({ visible: true });
  },

  closePopup() {
    this.setData({ visible: false });
  },

  onVisibleChange({ detail }) {
    this.setData({ visible: detail.visible });
  },

  onVisible2Change(e) {
    this.setData({
      visible2: e.detail.visible,
    });
  },

  onNameChange(e) {
    this.setData({ 'formData.name': e.detail.value });
  },

  onGenderChange(e) {
    this.setData({ 'formData.gender': e.detail.value });
  },

  onAgeChange(e) {
    this.setData({ 'formData.age': e.detail.value });
  },

  onPhoneChange(e) {
    this.setData({ 'formData.phone': e.detail.value });
  },

  async submitForm() {
    console.log('提交的表单数据：', this.data.formData);
    if (this.data.formData.age < 10 || this.data.formData.age > 100) {
      wx.showToast({
        title: '请填入正确的年龄',
        icon: 'none',
      });
      return;
    }
    try {
      await app.request(`/order/${this.data.houstType}/`, 'POST', {
        holder_name: this.data.formData.name,
        holder_gender: this.data.formData.gender,
        holder_age: this.data.formData.age,
        holder_mobile: this.data.formData.phone,
        [this.data.houstType]: this.data.houseInfo.id,
      });
      wx.showToast({
        title: '提交成功',
      });
      this.closePopup();
    } catch {}

    // 这里可以添加表单验证逻辑
    // 如果验证通过，可以发送请求到服务器
  },
});
