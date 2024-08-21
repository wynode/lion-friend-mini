const app = getApp();
Page({
  data: {
    services: [
      {
        id: 1,
        title: '新加坡国际学校参观及咨询服务',
        description: '参观热门大学，提供咨询服务',
        details: ['预约参访新加坡知名国际学校', '安排双语翻译老师陪同访校', '资深专业学校顾问深度定制咨询'],
        image: 'https://example.com/image1.png',
      },
      {
        id: 2,
        title: '新加坡国际学校申请服务配套',
        description: '参观热门大学，提供咨询服务',
        details: [
          '了解学生的大数背景和初步收集材料',
          '介绍新加坡国际学校教育概况',
          '制定学生专属的留学/转学规划方案',
          '整理完善申请材料，协助文书，视频等包装',
          '填写相关表格，完成学校申请',
          '沟通协调入学测试和面试时间',
          '指导入学测试及模拟面试培训',
          '申请进度及结果跟踪',
          '协助学生接受学校录取通知',
        ],
        image: 'https://example.com/image2.png',
      },
      {
        id: 3,
        title: '考点考培服务',
        description: '参观热门大学，提供咨询服务',
        details: [
          '针对日标国际学校 1:1真题模拟测试',
          '针对日标国际学校的考前强化真题培训',
          '政府学校入学KET/PET/AEIS考试培训',
          '雅思考试报名及VIP考团考试安排',
        ],
        image: 'https://example.com/image3.png',
      },
      {
        id: 4,
        title: '新加坡热门大学参观及咨询服务',
        description: '参观热门大学，提供咨询服务',
        details: ['学长学姐陪同参观新加坡热门大学校园', '针对日标国际学校的考前强化真题培训'],
        image: 'https://example.com/image4.png',
      },
    ],
    showDialog: false,
    dialogItem: { phone: '13456789012', wechat: 'qwerty_asdfg' },
  },

  onShow(options) {
    console.log(options);
    // this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
    // const { item } = e.currentTarget.dataset;
  },

  async handleInitPage() {
    app.request(`/course/`).then((res) => {
      this.setData({
        res,
      });
    });
  },

  onConnectTap(e) {
    const service = e.currentTarget.dataset.service;
    console.log('Service tapped:', service);
    this.setData({
      showDialog: true,
    });
  },
  onPhoneTap() {
    wx.setClipboardData({
      data: this.data.dialogItem.phone,
      success: function (res) {
        wx.showToast({
          title: '复制电话成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '复制电话失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },
  onWechatTap() {
    wx.setClipboardData({
      data: this.data.dialogItem.wechat,
      success: function (res) {
        wx.showToast({
          title: '复制微信成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '复制微信失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },

  closeDialog() {
    this.setData({
      showDialog: false,
    });
  },
});
