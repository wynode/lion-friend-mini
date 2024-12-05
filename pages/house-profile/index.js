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
  let rooms = roomFacilities;
  if (Array.isArray(roomFacilities)) {
    rooms = roomFacilities;
  } else {
    rooms = roomFacilities.split(',');
  }
  return rooms.map((facility) => ({
    image: facilityImageMap[facility] || '/assets/images/house/xyj.svg', // 使用默认图片如果没有匹配
    name: facility,
  }));
}

function extractDetails(houseData, houseType) {
  const details = [
    {
      label: '月租',
      value: `${houseData?.price}/月`,
    },
    {
      label: '出租方式',
      value: houseData?.rental_type_cn,
    },
    {
      label: '房间类型',
      value: houseData?.room_type_cn,
    },
    {
      label: '入住时间',
      value: houseData?.check_in_date?.slice(-5),
    },
    {
      label: '面积',
      value: `${houseData?.area}㎡`,
    },

    {
      label: '性质',
      value: houseData?.property_type_cn,
    },
    {
      label: '楼层',
      value: `${houseData?.floor}层`,
    },
    {
      label: '租期',
      value: `${houseData?.min_of_months}个月`,
    },
  ];
  // 过滤掉值为空或未知的项
  if (houseType === 'host_family') {
    details.push({
      label: '可住性别',
      value: houseData?.gender_cn,
    });
  }

  return details.filter((item) => item.value && item.value !== '未知' && item.value !== '0层');
}

Page({
  data: {
    longitude: 103.851959,
    latitude: 1.29027,
    extUserId: 0,
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
          value: '',
        },
        {
          label: '出租方式',
          value: '',
        },
        {
          label: '房间类型',
          value: '',
        },
        {
          label: '入住时间',
          value: '',
        },
        {
          label: '面积',
          value: '',
        },
        {
          label: '性质',
          value: '',
        },
      ],

      title: '',
      desc: '',
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
    second_parent: '',
    parent: '',
    visible2: false,
  },

  onShareAppMessage() {
    const comData = {
      parent: this.data.extUserId,
      second_parent: this.data.parent,
    };
    this.shareAddScore();
    return {
      title: '快来看！我在星辉租房发现一套非常棒的房源！',
      path: `/pages/house-profile/index?id=${this.data.houseInfo.id}&type=${this.data.houstType}&parent=${comData.parent}&second_parent=${comData.second_parent}`,
      // imageUrl: '/path/to/your/share-image.png'  // 可选，自定义转发的图片
    };
  },

  onShareTimeline() {
    const comData = {
      parent: this.data.extUserId,
      second_parent: this.data.parent,
    };
    return {
      title: '快来看！我在星辉租房发现一套非常棒的房源！',
      query: `id=${this.data.houseInfo.id}&type=${this.data.houstType}&parent=${comData.parent}&second_parent=${comData.second_parent}`,
      // imageUrl: '/path/to/your/share-image.png'  // 可选，自定义转发的图片
    };
  },

  async shareAddScore() {
    await app.request('/wallet/auto_compute/', 'POST', {
      // article_id: this.data.houseInfo.id,
      // parent: this.data.parent,
      // second_parent: this.data.second_parent,
      // [`${this.data.houstType}_id`]: this.data.houseInfo.id,
      action: 'share_app',
    });
  },

  handleImageClick(e) {
    const { index } = e.detail;
    const { images } = this.data.houseInfo;

    wx.previewImage({
      current: images[index], // 当前显示图片的链接
      urls: images, // 需要预览的图片链接列表
    });
  },

  handleGoOtherProfile() {
    wx.setStorageSync('otherId', this.data.userInfo.id);
    wx.navigateTo({
      url: '/pages/other-center/index',
    });
  },

  async onLoad(options) {
    try {
      wx.showLoading();
      const { id, type, parent, second_parent = '' } = options || {};
      console.log(id, type, parent, second_parent);
      // const token = wx.getStorageSync('access');
      // if (!token) {
      //   wx.setStorageSync('isProfile', true);
      //   wx.navigateTo({
      //     url: '/pages/login/index',
      //   });
      // }
      const myId = await app.request('/my_user_id/', 'GET');
      this.setData({
        extUserId: myId?.ext_user_id,
      });
      if (parent) {
        const payload = {
          parent,
          second_parent,
          action: 'view',
          [`${type}_id`]: id,
        };
        this.setData({ parent, second_parent });

        await app.request('/wallet/auto_compute/', 'POST', {
          ...payload,
        });
      }
      let res = {};
      if (type === 'host_family') {
        this.setData({ houstType: 'host_family' });
        res = await app.request(`/host_family/${id}/`);
      } else {
        this.setData({ houstType: 'shared_rental' });
        res = await app.request(`/shared_rental/${id}/`);
      }
      wx.hideLoading();

      this.setData({
        houseInfo: {
          ...res,
          facilities: convertToFacilities(res?.room_facility || []),
          details: extractDetails(res, type),
          is_like: res?.is_current_like,
          is_collect: res?.is_current_favorite,
        },
        markers: [
          {
            id: 1,
            longitude: res?.location?.lng || this.data.longitude,
            latitude: res?.location?.lat || this.data.latitude,
            iconPath: '/assets/images/house/mark.svg',
            joinCluster: true,
            width: 40,
            height: 44,
          },
        ],
        userInfo: {
          ...res.deployer_data,
          tags: [
            `房源${res?.deployer_data?.host_family_count + res?.deployer_data?.shared_rental_count}`,
            `文章${res?.deployer_data?.article_count}`,
          ],
        },
      });
    } catch {
      wx.hideLoading();
    }
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
    if (this.data.formData.name.length < 2) {
      wx.showToast({
        title: '请填入正确的姓名',
        icon: 'none',
      });
      return;
    }
    try {
      wx.showLoading();
      const res = await app.request(`/order/${this.data.houstType}/`, 'POST', {
        holder_name: this.data.formData.name,
        holder_gender: this.data.formData.gender,
        holder_age: this.data.formData.age,
        holder_mobile: this.data.formData.phone,
        [this.data.houstType]: this.data.houseInfo.id,
        parent_ext_user: this.data.parent,
        second_parent_ext_user: this.data.second_parent,
      });
      // await app.request('/wallet/auto_compute/', 'POST', {
      //   // order_id: res.id,
      //   parent: this.data.parent,
      //   second_parent: this.data.second_parent,
      //   action: 'order',
      //   [`${this.data.houstType}_order_id`]: res.id,
      // });
      wx.showToast({
        title: '提交成功',
      });
      this.closePopup();
      wx.hideLoading();
    } catch {
      wx.hideLoading();
    }

    // 这里可以添加表单验证逻辑
    // 如果验证通过，可以发送请求到服务器
  },
});
