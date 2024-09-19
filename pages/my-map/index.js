const app = getApp();
Page({
  data: {
    latitude: 1.2855, // 新加坡中心点纬度
    longitude: 103.8565, // 新加坡中心点经度
    scale: 11,
    markers: [
      {
        id: 1,
        latitude: 1.2855,
        longitude: 103.8565,
        iconPath: '/assets/images/house/mark.svg',
        joinCluster: true,
        width: 40,
        height: 44,
      },
    ],
    radiusOptions: [3, 5, 7, 9],
    selectedRadius: 3,
    circles: [
      {
        latitude: 1.2855,
        longitude: 103.8565,
        color: '#FFEDBAcc', // 圆的填充颜色，cc表示80%透明度
        fillColor: '#FFEDBA80', // 圆的填充颜色，80表示50%透明度
        radius: 3000, // 初始半径3km，单位是米
        strokeWidth: 2, // 边框宽度
      },
    ],
  },

  onLoad: function () {
    // 页面加载时的逻辑
  },

  onSearchInput: function (e) {
    // 处理搜索输入
    console.log(e.detail.value);
  },

  setRadius: function (e) {
    const radius = e.currentTarget.dataset.radius;
    this.setData({
      selectedRadius: radius,
      'circles[0].radius': radius * 1000, // 将km转换为米
    });
  },

  onRegionChange: function (e) {
    // 只在拖动结束时更新位置
    if (e.type === 'end' && e.causedBy === 'drag') {
      const mapCtx = wx.createMapContext('myMap');
      mapCtx.getCenterLocation({
        success: (res) => {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            'markers[0].latitude': res.latitude,
            'markers[0].longitude': res.longitude,
            'circles[0].latitude': res.latitude,
            'circles[0].longitude': res.longitude,
          });
        },
      });
    }
  },

  searchArea: function () {
    // 执行区域搜索的逻辑
    wx.setStorageSync('isMap', true);
    wx.setStorageSync('mapSearch', {
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      selectedRadius: this.data.selectedRadius,
    });
    wx.navigateTo({
      url: '/pages/house-filter/index',
    });
    // 这里你可以调用地图API进行实际的搜索
  },
});
