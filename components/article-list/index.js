Component({
  externalClasses: ['house-class', 'house-item-class'],

  properties: {
    articleList: {
      type: Array,
      value: [],
    },
    goUrl: {
      type: String,
      value: '/pages/article-profile/index',
    },
  },

  data: {
    filteredArticleList: [],
  },

  observers: {
    articleList: function (list) {
      this.filterArticleList(list);
    },
  },

  methods: {
    filterArticleList(list) {
      const filteredList = list.map((item) => {
        return {
          ...item,
          title: item.title.length > 21 ? `${item.title.slice(0, 21)}...` : item.title,
        };
      });
      console.log(filteredList);

      this.setData({
        filteredArticleList: filteredList,
      });
    },
    handleGoHouseProfile(e) {
      const { item } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `${this.data.goUrl}?id=${item.id}`,
      });
    },
  },
});
