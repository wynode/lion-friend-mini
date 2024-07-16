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
    {
      label: '整租',
      value: 'all',
    },
    {
      label: '合租',
      value: 'he',
    },
  ],
};
const roomTypeFilter = {
  value: 'no',
  options: [
    {
      label: '主人房',
      value: 'no',
    },
    {
      label: '普通房',
      value: '6',
    },
    {
      label: '床位',
      value: '3',
    },
  ],
};
const roomFacilityFilter = {
  value: '1',
  options: [
    {
      label: '阳台',
      value: 'no',
    },
    {
      label: '独立卫生间',
      value: '1',
    },
    {
      label: '空调',
      value: '4',
    },
  ],
};
const sorterFilter = {
  value: 'default',
  options: [
    {
      value: 'default',
      label: '默认排序',
    },
    {
      value: 'price',
      label: '价格从高到低',
    },
    {
      value: 'price1',
      label: '价格从低到高',
    },
  ],
};
const positionFilter = {
  value: 'default',
  options: [
    {
      value: 'default',
      label: '东方',
    },
    {
      value: 'x',
      label: '西方',
    },
    {
      value: 'price',
      label: '北方',
    },
    {
      value: 'price1',
      label: '南方',
    },
  ],
};


const houseList = [
  {
    id: 1,
    image: 'https://cdn.luminouscn.com/house.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 2,
    image: 'https://cdn.luminouscn.com/house1.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 3,
    image: 'https://cdn.luminouscn.com/house1.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 4,
    image: 'https://cdn.luminouscn.com/house.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 5,
    image: 'https://cdn.luminouscn.com/house1.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 6,
    image: 'https://cdn.luminouscn.com/house.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
  {
    id: 7,
    image: 'https://cdn.luminouscn.com/house.png',
    title: '合租精装公寓单人间',
    desc: '公寓位于cityhall地铁站附近的fu',
    price: '1500',
    tags: ['38.52㎡', '合租', '公寓', '普通房'],
  },
];

Page({
  data: {
    value: 100,
    priceFilter,
    sorterFilter,
    houseTypeFilter,
    roomTypeFilter,
    roomFacilityFilter,
    positionFilter,
    filter: {
      sorter: 'default',
      price: 'no',
      ganPrice: [3000, 5000],
    },
    houseList,
  },

  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
  },

  onShow(options) {
    console.log(options);
  },

  onLoad(options) {
    console.log(options);
    // const { id } = options || {};
  },

  async handleInitPage() {
    app.request(`/course/`).then((res) => {
      this.setData({
        res,
      });
    });
  },

  // ---------- 自定义函数 ------

  handleFilterSorterTap(e) {
    const { value } = e.detail;
    this.setData({
      filter: {
        ...this.data.filter,
        sorter: value,
      },
    });
  },

  handleFilterPriceTap(e) {
    const { item } = e.currentTarget.dataset;
    this.setData({
      filter: {
        ...this.data.filter,
        price: item.value,
      },
    });
  },
});
