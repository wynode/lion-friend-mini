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
      count: 9, // 允许选择的最大数量
    },
  },

  onShow(options) {
    console.log(options);
  },

  onLoad(options) {
    console.log(options);
  },

  async handleAdd(e) {
    const { fileList } = this.data;
    const { files } = e.detail;

    // 检查是否超过最大数量限制
    if (fileList.length + files.length > 9) {
      wx.showToast({
        icon: 'none',
        title: '最多只能上传9张图片',
      });
      return;
    }

    wx.showLoading({
      title: '上传中...',
      mask: true,
    });

    try {
      // 使用 Promise.all 同时处理多个文件上传
      const uploadPromises = files.map(async (file, index) => {
        // 文件大小限制 (10MB)
        if (file.size > 50 * 1024 * 1024) {
          throw new Error('文件大小不能超过50MB');
        }

        let uploadResult;

        if (file.type === 'video') {
          uploadResult = await handleFileInUpload(file.name, file.url);
        } else if (file.type === 'image') {
          const compressResult = await wx.compressImage({
            src: file.url,
            quality: 50,
          });
          uploadResult = await handleFileInUpload(file.name, compressResult.tempFilePath);
        } else {
          throw new Error('不支持的文件类型');
        }

        // 更新加载提示
        wx.showLoading({
          title: `上传中(${index + 1}/${files.length})`,
          mask: true,
        });

        return {
          url: uploadResult,
          name: file.name,
          type: file.type,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const newFileList = [...fileList, ...uploadedFiles];

      this.setData({
        fileList: newFileList,
      });

      wx.hideLoading();
      wx.showToast({
        icon: 'success',
        title: '上传成功',
      });
    } catch (error) {
      wx.hideLoading();
      console.error('Upload error:', error);
      wx.showToast({
        icon: 'error',
        title: error.message || '上传出错，请重试',
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
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: `${res.latitude},${res.longitude}`,
        });
      },
    });
  },

  async handlePublish() {
    // 验证必填字段
    if (!this.data.title.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请填写标题',
      });
      return;
    }

    if (!this.data.content.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请填写正文',
      });
      return;
    }

    try {
      wx.showLoading({
        title: '发布中...',
        mask: true,
      });

      const res = await app.request('/community/articles/', 'POST', {
        title: this.data.title,
        content: this.data.content,
        images: this.data.fileList.map((item) => item.url),
        show: true,
        location: this.data.location,
      });

      await app.request('/wallet/auto_compute/', 'POST', {
        article_id: res.id,
        action: 'deploy_article',
      });

      wx.hideLoading();
      wx.showToast({
        icon: 'success',
        title: '发布成功',
      });

      // 获取页面栈
      const pages = getCurrentPages();
      // 查找文章列表页面

      const listPage = pages.find((page) => page.route === 'pages/friend-community/index');
      if (listPage) {
        // 调用列表页的刷新方法
        listPage.otherLoadArticleList && listPage.otherLoadArticleList();
      }

      setTimeout(() => {
        wx.switchTab({
          url: '/pages/friend-community/index',
        });
      }, 1500);
      // wx.switchTab({
      //   url: '/pages/friend-community/index',
      // });
    } catch (error) {
      wx.hideLoading();
      console.error(error);
      let errMsg = '发布文章出错，请重试';
      if (error.data) {
        errMsg = JSON.stringify(error.data);
      }
      wx.showToast({
        icon: 'error',
        title: errMsg,
      });
    }
  },
});
