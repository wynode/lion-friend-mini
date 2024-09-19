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
      const file = files[0];
      let uploadResult;
      wx.showLoading();

      if (file.type === 'video') {
        // 处理视频文件
        uploadResult = await handleFileInUpload(file.name, file.url);
      } else if (file.type === 'image') {
        // 处理图片文件
        const compressResult = await wx.compressImage({
          src: file.url,
          quality: 50,
        });
        uploadResult = await handleFileInUpload(file.name, compressResult.tempFilePath);
      } else {
        throw new Error('Unsupported file type');
      }

      const newFileList = [
        ...fileList,
        {
          url: uploadResult,
          name: file.name,
          type: file.type,
        },
      ];
      this.setData({
        fileList: newFileList,
      });
      wx.hideLoading();
    } catch (error) {
      wx.hideLoading();
      console.error('Upload error:', error);
      wx.showToast({
        icon: 'error',
        title: '上传出错，请联系管理员',
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
      wx.showLoading();
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
        url: '/pages/friend-community/index',
      });
      wx.hideLoading();
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        icon: 'error',
        title: '发布文章出错，请联系管理员',
      });
    }
  },
});
