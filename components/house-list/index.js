Component({
  externalClasses: ['house-class', 'house-item-class'],

  properties: {
    houseList: {
      type: Array,
      value: [],
    },
    goUrl: {
      type: String,
      value: '/pages/house-profile/index',
    },
  },
  data: {
    filteredHouseList: [],
  },

  observers: {
    houseList: function (newHouseList) {
      this.filterHouseList(newHouseList);
    },
  },

  methods: {
    filterHouseList(list) {
      const filteredList = list.map((item) => {
        return {
          ...item,
          title: item.title.length > 11 ? `${item.title.slice(0, 11)}...` : item.title,
          desc: item.description.length > 30 ? `${item.description.slice(0, 30)}...` : item.description,
          image: item.images[0],
          tags: [`${item.area}㎡`, item.rental_type_cn, item.property_type_cn],
        };
      });
      console.log(filteredList);

      this.setData({
        filteredHouseList: filteredList,
      });
    },

    handleGoHouseProfile(e) {
      const { item } = e.currentTarget.dataset;
      console.log('xxx');
      wx.navigateTo({
        url: `${this.data.goUrl}?id=${item.id}`,
      });
    },
  },
});
