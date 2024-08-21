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
    articleInfo: {
      is_like: true,
      is_collect: false,
      username: '肥嘟嘟左卫门',
      avatar: 'https://cdn.luminouscn.com/avatar.jpg',
      banner: 'https://cdn.luminouscn.com/article-banner.jpg',
      title: '在新加坡读书我找到了有一种家的归属感',
      desc: '将现住的别墅主人房短租6.15日～7.18日止33天～一个月1200$…包水电网按天一天60$…高级别墅～环境一流～泳池➕健身房都有…特别安静还可以长租…第一个月还是优惠2+1主人房～可以住2个人…2个人的独立洗手间…独立房间～独自2楼房间～7月出可以入住3楼超大主人房长租…5.15可以入住～一个人一个月2000$水电均摊！',
      ip: '新加坡',
      update_time: '05-11 22:22',
      location: {
        longitude: 103.851959,
        latitude: 1.29027,
      },
      comment: [
        {
          tag: '',
          name: '用户_24030113',
          avatar: 'https://cdn.luminouscn.com/avatar1.jpg',
          content: '好羡慕，能找到这么好的房子评论内容，最长100个字评论内容',
          ip: '新加坡',
          update_time: '2024-05-12 14:28',
          reply: [
            {
              tag: '作者',
              name: '肥嘟嘟左卫门',
              reply_obj: '用户_24030113',
              avatar: 'https://cdn.luminouscn.com/avatar.jpg',
              content: '啊对，你说的对',
              ip: '新加坡',
              update_time: '2024-05-12 14:28',
            },
            {
              tag: '',
              name: '当当里个当',
              reply_obj: '用户_24030113',
              avatar: 'https://cdn.luminouscn.com/avatar2.jpg',
              content: '好棒，居然能找到这么好的房子',
              ip: '新加坡',
              update_time: '2024-05-12 14:28',
            },
          ],
        },
        {
          tag: '',
          name: '用户_24030113',
          reply_obj: '',
          avatar: 'https://cdn.luminouscn.com/avatar3.jpg',
          content: '好羡慕，能找到这么好的房子评论内容，最长100个字评论内容',
          ip: '新加坡',
          update_time: '2024-05-12 14:28',
        },
        {
          tag: '',
          name: '当当里个当',
          reply_obj: '用户_24030113',
          avatar: 'https://cdn.luminouscn.com/avatar2.jpg',
          content: '好棒，居然能找到这么好的房子',
          ip: '新加坡',
          update_time: '2024-05-12 14:28',
        },
      ],
    },
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

  handleHouseUserOpreation(e) {
    const { item } = e.currentTarget.dataset;
    console.log(item);
    if (item === 'like') {
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_like: false },
      });
    } else if (item === 'unLike') {
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_like: true },
      });
    } else if (item === 'collect') {
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_collect: false },
      });
    } else if (item === 'unCollect') {
      this.setData({
        articleInfo: { ...this.data.articleInfo, is_collect: true },
      });
    } else if (item === 'forward') {
      console.log('for');
    }
  },
});
