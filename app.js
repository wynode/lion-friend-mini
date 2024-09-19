/*
 * @Author: wynode bugeikela@gmail.com
 * @Date: 2023-10-19 00:11:55
 * @LastEditors: wynode bugeikela@gmail.com
 * @LastEditTime: 2023-11-27 21:05:55
 * @FilePath: \weapp\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import updateManager from './common/updateManager';

App({
  // onLaunch: function () {

  // },
  onShow: function () {
    updateManager();
  },
  async onLaunch() {
    // wx.setStorageSync('access_token', '')
    // await this.userLogin()
  },

  request(
    url,
    method = 'GET',
    data = {},
    header = {
      'content-type': 'application/json',
    },
  ) {
    const customeHeader = { ...header };
    const token = wx.getStorageSync('access');
    if (token && !url.includes('/wx_token')) {
      customeHeader.Authorization = `Bearer ${token}`;
    }
    return new Promise((resolve, reject) => {
      // wx.showLoading();
      wx.request({
        url: `https://api.shichengyouyou.com${url}`,
        method,
        data,
        header: customeHeader,
        success(res) {
          // wx.hideLoading();
          // 请求成功处理
          if (res.statusCode === 401) {
            wx.showToast({
              icon: 'none',
              title: `未获取到用户登录信息，请登录`,
            });
            reject(res);
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/index',
              });
            }, 1500);
            return;
          }
          if (res.statusCode === 400) {
            wx.showToast({
              icon: 'none',
              title: `${JSON.stringify(res.data)}`,
            });
            reject(res);
            return;
          }
          if (res.data) {
            resolve(res.data);
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message || '请求失败',
            });
            reject(res);
          }
        },
        fail(err) {
          // 请求失败处理
          // wx.hideLoading();
          // that.userLogin()
          console.log(err);
          console.log(`https://api.liliantech.com${url}`, '这个是请求的url');
          reject(err);
        },
      });
    });
  },
});
