import handleFileInUpload from '../../common/cosUpload';

const app = getApp();
Page({
  data: {
    fileList: [],
    title: '',
    content: '',
    location: '30.628249,104.081688',

    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
  },

  onShow(options) {
    console.log(options);
    // this.getTabBar().init();
  },

  onLoad(options) {
    console.log(options);
  },

  async handleAdd(e) {
    const { fileList } = this.data;
    const { files } = e.detail;
    try {
      const compressResult = await wx.compressImage({
        src: files[0].url, // 图片路径
        quality: 50, // 压缩质量
      });
      const res = await handleFileInUpload(files[0].name, compressResult.tempFilePath);
      const newFileList = [
        ...fileList,
        {
          url: res,
          name: files[0].name,
          type: 'image',
        },
      ];
      this.setData({
        fileList: newFileList,
      });
    } catch {
      wx.showToast({
        icon: 'error',
        title: '上传图片出错，请联系管理员',
      });
    }
  },

  handleRemove(e) {
    const { index } = e.detail;
    const { fileList } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },

  onTitleChange(e) {
    this.setData({
      title: e.detail.value,
    });
  },

  onContentChange(e) {
    this.setData({
      content: e.detail.value,
    });
  },

  onSelectLocation() {
    // 这里可以调用地图选择位置的API
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: `${res.latitude},${res.longitude}`,
        });
      },
    });
  },

  async handlePublish() {
    try {
      await app.request('/community/articles/', 'POST', {
        title: this.data.title,
        content: this.data.content,
        images: this.data.fileList.map((item) => item.url),
        show: true,
        location: this.data.location,
      });
      wx.showToast({
        title: '发布成功',
      });
      wx.switchTab({
        url: '/pages/my-center/index',
      });
    } catch (error) {
      wx.showToast({
        icon: 'error',
        title: '发布文章出错，请联系管理员',
      });
    }
  },
});
