const app = getApp();
Page({
  data: {
    services: [
      // {
      //   id: 1,
      //   title: '留学转学规划',
      //   description: '乐中达专业的咨询和顾问团队，可以解决全年龄段的新加坡留学规划以及延申服务方案。',
      //   image: 'https://example.com/image1.png',
      // },
      // {
      //   id: 2,
      //   title: '签证文件类服务',
      //   description: '可以提供签证文件类服务。',
      //   image: 'https://example.com/image2.png',
      // },
      // {
      //   id: 3,
      //   title: '新生落地类服务',
      //   description: '可以提供新生落地后相关辅助服务。',
      //   image: 'https://example.com/image3.png',
      // },
      // {
      //   id: 4,
      //   title: '家庭融入类服务',
      //   description: '可以提供海外家庭本地融入可能需要的各种服务。',
      //   image: 'https://example.com/image4.png',
      // },
    ],
  },

  onShow(options) {
    console.log(options);
    // this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
    // const { item } = e.currentTarget.dataset;
    this.handleInitPage();
  },

  async handleInitPage() {
    const res = await app.request(`/student_service/type/`);
    console.log(res);
    this.setData({ services: res.results });
  },

  onServiceTap(e) {
    const service = e.currentTarget.dataset.service;
    console.log('Service tapped:', service);

    // 这里可以添加导航到服务详情页的逻辑
    wx.navigateTo({
      url: `/pages/student-service-profile/index?id=${service.id}`,
    });
  },
});
