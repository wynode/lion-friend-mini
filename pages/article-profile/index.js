const app = getApp();
Page({
  data: {
    markers: [
      {
        id: 1,
        longitude: 103.851959,
        latitude: 1.29027,
      },
    ],
    id: '',
    articleInfo: {},
    visible2: false,
  },

  onShareAppMessage() {
    return {
      title: '快来看！我在星辉租房发现一套非常棒的文章！',
      path: `/pages/artilcle-profile/index?id=${this.data.id}`,
      // imageUrl: '/path/to/your/share-image.png'  // 可选，自定义转发的图片
    };
  },

  onShareTimeline() {
    return {
      title: '快来看！我在星辉租房发现一套非常棒的文章！',
      query: `id=${this.data.id}`,
      // imageUrl: '/path/to/your/share-image.png'  // 可选，自定义转发的图片
    };
  },

  onShow(options) {
    console.log(options);
    // this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
    const { id } = options;
    this.setData({ id });
    this.handleInitPage(id);
  },

  handleGoOtherProfile() {
    wx.setStorageSync('otherId', this.data.articleInfo.deployer);
    wx.navigateTo({
      url: '/pages/other-center/index',
    });
  },

  onVisible2Change(e) {
    this.setData({
      visible2: e.detail.visible,
    });
  },
  onVisible3Change(e) {
    this.setData({
      visible2: true,
    });
  },

  isImage(url) {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  },

  isVideo(url) {
    return /\.(mp4|avi|mov|wmv|flv|mkv|webm)$/i.test(url);
  },

  handleImageClick(e) {
    const { index } = e.detail;
    const { images } = this.data.articleInfo;
    const processedMedia = images.map((url) => ({
      url,
      type: this.isImage(url) ? 'image' : this.isVideo(url) ? 'video' : 'unknown',
    }));

    wx.previewMedia({
      current: index, // 当前显示图片的链接
      sources: processedMedia, // 需要预览的图片链接列表
    });
  },

  async handleInitPage(id) {
    const res = await app.request(`/community/articles/${id}/`);
    const lat = Number(res.location.split(',')[0]) || 1.29027;
    const lng = Number(res.location.split(',')[1]) || 103.851959;
    // const processedMedia = res.images.map((url) => ({
    //   url,
    //   type: this.isImage(url) ? 'image' : this.isVideo(url) ? 'video' : 'unknown',
    // }));
    this.setData({
      articleInfo: {
        ...res,
        lat,
        lng,
        // media: processedMedia,
      },
      markers: [
        {
          id: 1,
          latitude: lat,
          longitude: lng,
          iconPath: '/assets/images/house/mark.svg',
          joinCluster: true,
          width: 40,
          height: 44,
        },
      ],
    });
  },

  showReplyModal: function (e) {
    const item = e.currentTarget.dataset.item;

    wx.showModal({
      title: '回复',
      content: '',
      editable: true,
      placeholderText: '请输入回复内容',
      success: async (res) => {
        if (res.confirm) {
          await app.request('/community/comments/', 'POST', {
            parent: item.parent,
            content: res.content,
            article: item.article,
          });
          wx.showToast({
            title: '回复成功',
          });
          this.handleInitPage(this.data.id);
        }
      },
    });
  },
  showReplyModal2: function (e) {
    const item = e.currentTarget.dataset.item;

    wx.showModal({
      title: '评论',
      content: '',
      editable: true,
      placeholderText: '请输入评论内容',
      success: async (res) => {
        if (res.confirm) {
          await app.request('/community/comments/', 'POST', {
            // parent: item.parent,
            content: res.content,
            article: this.data.id,
          });
          this.handleInitPage(this.data.id);
          wx.showToast({
            icon: 'none',
            title: '评论成功',
          });
        }
      },
    });
  },

  handleHouseUserOpreation(e) {
    const { item } = e.currentTarget.dataset;
    console.log(item);
    if (item === 'like') {
      app.request(`/community/article/${this.data.articleInfo.id}/like/`, 'POST');
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_like: false },
      });
      wx.showToast({
        icon: 'none',
        title: '取消点赞成功',
      });
    } else if (item === 'unLike') {
      app.request(`/community/article/${this.data.articleInfo.id}/like/`, 'POST');
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_like: true },
      });
      wx.showToast({
        icon: 'none',
        title: '点赞成功',
      });
    } else if (item === 'collect') {
      app.request(`/community/article/${this.data.articleInfo.id}/favorite/`, 'POST');
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_collect: false },
      });
      wx.showToast({
        icon: 'none',
        title: '取消收藏成功',
      });
    } else if (item === 'unCollect') {
      app.request(`/community/article/${this.data.articleInfo.id}/favorite/`, 'POST');
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_collect: true },
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
});
