const app = getApp();

const priceFilter = {
  value: 'no',
  options: [
    {
      label: '不限',
      value: 'no',
    },
    {
      label: '1k以内',
      value: '1',
    },
    {
      label: '1k-2k',
      value: '2',
    },
    {
      label: '2k-3k',
      value: '3',
    },
    {
      label: '3k-5k',
      value: '4',
    },
    {
      label: '5k以上',
      value: '5',
    },
  ],
};
const houseTypeFilter = {
  value: 'he',
  options: [
    { value: 1, label: '整租' },
    { value: 2, label: '合租' },
  ],
};
const propertyTypeFilter = {
  value: 'no',
  options: [
    { value: 1, label: '组屋' },
    { value: 2, label: '共管公寓' },
    { value: 3, label: '私人公寓' },
    { value: 4, label: '排屋' },
  ],
};
const roomFacilityFilter = {
  value: '1',
  options: [
    { value: '独立卫浴', label: '独立卫浴' },
    { value: '公共卫浴', label: '公共卫浴' },
    { value: '热水器', label: '热水器' },
    { value: '空调', label: '空调' },
    { value: '风扇', label: '风扇' },
    { value: 'WIFI', label: 'WIFI' },
    { value: '微波炉', label: '微波炉' },
    { value: '电磁炉', label: '电磁炉' },
    { value: '烤箱', label: '烤箱' },
    { value: '冰箱', label: '冰箱' },
    { value: '洗衣机', label: '洗衣机' },
    { value: '烘干机', label: '烘干机' },
    { value: '橱柜', label: '橱柜' },
    { value: '床', label: '床' },
    { value: '衣橱', label: '衣橱' },
    { value: '椅子', label: '椅子' },
    { value: '桌子', label: '桌子' },
  ],
};
const sorterFilter = {
  value: 'default',
  options: [
    {
      value: '-deploy_time',
      label: '默认排序',
    },
    {
      value: '-price',
      label: '价格从高到低',
    },
    {
      value: 'price',
      label: '价格从低到高',
    },
  ],
};
const positionFilter = {
  value: 0,
  options: [
    { value: 0, label: '不限' },
    { value: 1, label: '东部' },
    { value: 2, label: '西部' },
    { value: 3, label: '南部' },
    { value: 4, label: '北部' },
    { value: 5, label: '中部' },
  ],
};

const houseList = [];

// 辅助函数：将对象转换为查询字符串
function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== null && obj[key] !== '')
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
}

Page({
  data: {
    value: 100,
    priceFilter,
    sorterFilter,
    houseTypeFilter,
    propertyTypeFilter,
    roomFacilityFilter,
    positionFilter,
    filter: {
      title: '',
      sorter: '-deploy_time',
      price: 'no',
      ganPrice: [0, 5000],
      region: [],
      rental_type: [],
      property_type: [],
      room_facility: [],
    },
    sliderValue: [0, 100],
    maxPrice: 5000,
    houseList,
    pageNum: 1,
    pageSize: 10,
    hasMore: true,
  },

  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
  },

  onHide() {
    wx.setStorageSync('isMap', false);
  },

  onUnload() {
    wx.setStorageSync('isMap', false);
  },

  // 上拉触底事件
  onReachBottom() {
    if (this.data.hasMore) {
      this.fetchHouseList(true);
    }
  },

  onLoad(options) {
    const { type } = options;
    this.setData(
      {
        houseType: type,
      },
      () => {
        this.fetchHouseList();
      },
    );
  },

  async fetchHouseList(isReach) {
    const { filter, houseType } = this.data;

    // 构建查询参数
    const params = {
      order_by: filter.sorter,
      // 添加其他需要的筛选条件
    };
    if (filter.price !== 'no') {
      if (filter.ganPrice[0] === 5000) {
        params.price = `${filter.ganPrice[0]},${100000}`;
      } else {
        params.price = `${filter.ganPrice[0]},${filter.ganPrice[1]}`;
      }
    }
    if (filter.region.length) {
      params.region = filter.region.join(',');
    }
    if (filter.rental_type.length) {
      params.rental_type = filter.rental_type.join(',');
    }
    if (filter.property_type.length) {
      params.property_type = filter.property_type.join(',');
    }
    if (filter.room_facility.length) {
      params.room_facility = filter.room_facility.join(',');
    }
    if (filter.title) {
      params.title = filter.title;
    }

    const queryString = objectToQueryString(params);
    let url = `/${houseType}/${queryString ? '?' + queryString : ''}`;
    const isMap = wx.getStorageSync('isMap');
    if (isMap) {
      const { longitude, latitude, selectedRadius } = wx.getStorageSync('mapSearch');
      url = `/shared_rental/search_by_map/?lng=${longitude}&lat=${latitude}&radius=${selectedRadius}`;
    }

    const res = await app.request(url, 'GET', {
      page: this.data.pageNum,
      page_size: this.data.pageSize,
    });
    const newHouseList = res.results;

    this.setData({
      houseList: isReach ? [...this.data.houseList, ...newHouseList] : newHouseList,
      pageNum: this.data.pageNum + 1,
      hasMore: newHouseList.length === this.data.pageSize,
    });
  },

  // ---------- 自定义函数 ------

  handleFilterSorterTap(e) {
    const { value } = e.detail;
    this.setData(
      {
        filter: {
          ...this.data.filter,
          sorter: value,
        },
      },
      () => {
        this.fetchHouseList(); // 在 setData 的回调中调用
      },
    );
  },

  handleFilterPriceTap(e) {
    const { item } = e.currentTarget.dataset;
    this.setData({
      'filter.price': item.value,
      'filter.ganPrice': this.getPriceRange(item.value),
      sliderValue: this.getSliderValue(this.getPriceRange(item.value)),
    });
  },

  handleFilterRentalTypeTap(e) {
    const { item } = e.currentTarget.dataset;
    const currentRentalTypes = this.data.filter.rental_type || [];
    let newRentalTypes;

    if (currentRentalTypes.includes(item.value)) {
      // 如果已经选中，则移除
      newRentalTypes = currentRentalTypes.filter((type) => type !== item.value);
    } else {
      // 如果未选中，则添加
      newRentalTypes = [...currentRentalTypes, item.value];
    }

    this.setData({
      'filter.rental_type': newRentalTypes,
    });
  },

  handleFilterPropertyTypeTap(e) {
    const { item } = e.currentTarget.dataset;
    const currentPropertyTypes = this.data.filter.property_type || [];
    let newPropertyTypes;

    if (currentPropertyTypes.includes(item.value)) {
      // 如果已经选中，则移除
      newPropertyTypes = currentPropertyTypes.filter((type) => type !== item.value);
    } else {
      // 如果未选中，则添加
      newPropertyTypes = [...currentPropertyTypes, item.value];
    }

    this.setData({
      'filter.property_type': newPropertyTypes,
    });
  },

  handleFilterRoomFacilityTap(e) {
    const { item } = e.currentTarget.dataset;
    const currentRoomFacilities = this.data.filter.room_facility || [];
    let newRoomFacilities;

    if (currentRoomFacilities.includes(item.value)) {
      // 如果已经选中，则移除
      newRoomFacilities = currentRoomFacilities.filter((facility) => facility !== item.value);
    } else {
      // 如果未选中，则添加
      newRoomFacilities = [...currentRoomFacilities, item.value];
    }

    this.setData({
      'filter.room_facility': newRoomFacilities,
    });
  },

  handleFilterRegionTap(e) {
    const { item } = e.currentTarget.dataset;
    const currentRegion = this.data.filter.region || [];
    let newRegion;

    if (currentRegion.includes(item.value)) {
      // 如果已经选中，则移除
      newRegion = currentRegion.filter((facility) => facility !== item.value);
    } else {
      // 如果未选中，则添加
      newRegion = [...currentRegion, item.value];
    }

    this.setData({
      'filter.region': newRegion,
    });
  },

  handleInputChange(e) {
    const { value } = e.detail;
    this.setData({
      'filter.title': value,
    });
  },

  handleSliderChange(e) {
    const [min, max] = e.detail.value;
    const minPrice = Math.floor((min / 100) * this.data.maxPrice);
    const maxPrice = Math.ceil((max / 100) * this.data.maxPrice);
    this.setData({
      'filter.ganPrice': [minPrice, maxPrice],
      'filter.price': 'custom',
      sliderValue: [min, max],
    });
  },

  getPriceRange(value) {
    switch (value) {
      case '1':
        return [0, 1000];
      case '2':
        return [1000, 2000];
      case '3':
        return [2000, 3000];
      case '4':
        return [3000, 5000];
      case '5':
        return [5000, this.data.maxPrice];
      default:
        return [0, this.data.maxPrice];
    }
  },

  getSliderValue(range) {
    const [min, max] = range;
    return [Math.round((min / this.data.maxPrice) * 100), Math.round((max / this.data.maxPrice) * 100)];
  },

  handlePriceFilterCancel() {
    // 重置价格筛选
    this.setData({
      'filter.price': 'no',
      'filter.ganPrice': [0, this.data.maxPrice],
      sliderValue: [0, 100],
    });
  },
  closeDropdownMenu(index) {
    const dropdownMenu = this.selectComponent('#dropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.toggle(index);
    }
  },
  closeDropdownMenu2() {
    const dropdownMenu = this.selectComponent('#dropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.toggle(2);
    }
  },
  closeDropdownMenu3() {
    const dropdownMenu = this.selectComponent('#dropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.toggle(3);
    }
  },

  handleFilter2() {
    this.closeDropdownMenu(2);
    this.fetchHouseList(); // 调用获取房源列表的方法
  },
  handleFilter3() {
    this.closeDropdownMenu(3);
    this.fetchHouseList(); // 调用获取房源列表的方法
  },

  handlePriceFilterConfirm() {
    this.closeDropdownMenu(1);
    this.fetchHouseList(); // 调用获取房源列表的方法
  },
});
