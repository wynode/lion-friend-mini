const COS = require('cos-wx-sdk-v5');
const app = getApp();

const cos = new COS({
  // ForcePathStyle: true, // 如果使用了很多存储桶，可以通过打开后缀式，减少配置白名单域名数量，请求时会用地域域名
  SimpleUploadMethod: 'putObject', // 强烈建议，高级上传、批量上传内部对小文件做简单上传时使用putObject,sdk版本至少需要v1.3.0
  getAuthorization: function (options, callback) {
    // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
    // 异步获取临时密钥
    app.request('/cos_token/').then((result) => {
      const { credentials } = result;
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: result.startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: result.expiredTime, // 时间戳，单位秒，如：1580000000
      });
    });
  },
});

function handleFileInUpload(fileName, filePath) {
  return new Promise((resolve, reject) => {
    cos.uploadFile(
      {
        Bucket: 'shichengyouyou-1328810969',
        Region: 'ap-singapore',
        Key: fileName /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
        FilePath: filePath /* 上传文件路径，必须字段 */,
        SliceSize:
          1024 * 1024 * 500 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        },
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          const newUrl = `https://${data.Location.replace(
            'shichengyouyou-1328810969.cos.ap-singapore.myqcloud.com',
            'cdn.shichengyouyou.com',
          )}`;
          console.log('上传成功', newUrl);
          resolve(newUrl);
        }
      },
    );
  });
}
export default handleFileInUpload;

// 接下来可以通过 cos 实例调用 COS 请求。
// TODO
