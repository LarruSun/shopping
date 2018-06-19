export default {
  index: [
    {
      title: '店铺装修',
      path: '/index/storeHome',
      icon: require('@/assets/images/survey.png'),
      child: [
        {
          path: '/index/storeHome',
          name: '店铺主页',
        }
      ]
    },
  ],
  shop:[
  	{
      title: '门店管理',
      path: '/index/shopManger',
      icon: require('@/assets/images/survey.png'),
      child: [
        {
          path: '/shop/shopList',
          name: '门店列表',
        }
      ]
    },
  ],
  storeManagement: [
    {
      title: '商品管理',
      icon: require('@/assets/images/storeManagement.png'),
      child: [
        {
          path: '/storeManagement/addGoods',
          name: '新增商品',
        },
        {
          path: '/storeManagement/sellering',
          name: '出售中',
        },
        {
          path: '/storeManagement/wareHouse',
          name: '仓库中',
        },
        {
          path: '/storeManagement/soldOut',
          name: '已售罄',
        },
        {
          path: '/storeManagement/recycle',
          name: '回收站',
        },
        {
          path: '/storeManagement/guard',
          name: '警戒中',
        },
        {
          path: '/storeManagement/commodity',
          name: '商品分类',
        },
      ]
    }
  ],
  order: [
    {
      title: '订单管理',
      icon: require('@/assets/images/vipManage.png'),
      child: [
        {
          path: '/order/list',
          name: '所有订单',
        },
        {
          path: '/order/rightsOrder',
          name: '维权订单',
        }
      ]
    }
  ],
  setting: [
    {
      title: '设置',
      icon: require('@/assets/images/merchant.png'),
      child: [
        {
          path: '/setting/merchantStore',
          name: '店铺设置'
        },
        {
          path: '/setting/merchantDist',
          name: '配送设置'
        },
        {
          path: '/setting/printer',
          name: '打印机'
        },
        {
          path: '/setting/operator',
          name: '操作员'
        }
      ]
    }
  ]
};
