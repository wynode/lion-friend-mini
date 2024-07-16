const app = getApp();
Page({
  data: {
    videoInfo: {},
    originProgress: '',
    progress: '',
    initialTime: '',
  },

  async onUnload() {
    const student = wx.getStorageSync('student_id') || 0;
    if (this.data.originProgress !== 100) {
      await app.request('/course/progress/', 'POST', {
        student: student,
        course: this.data.videoInfo.id,
        progress: this.data.progress,
      });
    }
  },

  onLoad(options) {
    const { id } = options || {};

    app.request(`/course/${id}/`).then((res) => {
      const initialTime = Math.floor((res.seconds * res.progress) / 100);
      this.setData({
        initialTime,
        videoInfo: res,
        progress: res.progress,
        originProgress: res.progress,
      });
    });
  },

  bindtimeupdate(value) {
    const { currentTime, duration } = value.detail;
    if (this.data.originProgress !== 100) {
      this.setData({
        progress: Math.round((currentTime / duration) * 100),
      });
    }
  },

  bindpause() {
    const student = wx.getStorageSync('student_id') || 0;
    if (this.data.originProgress !== 100) {
      app
        .request('/course/progress/', 'POST', {
          student: student,
          course: this.data.videoInfo.id,
          progress: this.data.progress,
        })
        .then((res) => {
          console.log(res);
        });
    }
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:');
    console.log(e.detail.errMsg);
  },
});
