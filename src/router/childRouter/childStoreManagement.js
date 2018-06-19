export default [
  {
    path: '/storeManagement/addGoods',
    name: '新增商品',
    component:resolve=>require(['@/views/storeManagement/addGoods.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/storeManagement/addGoodsDetail',
    name: '商品详情',
    component:resolve=>require(['@/views/storeManagement/addGoodsDetail.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/storeManagement/sellering',
    name: '出售中',
    component:resolve=>require(['@/views/storeManagement/sellering.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/storeManagement/wareHouse',
    name: '仓库中',
    component:resolve=>require(['@/views/storeManagement/wareHouse.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/storeManagement/soldOut',
    name: '已售罄',
    component:resolve=>require(['@/views/storeManagement/soldOut.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/storeManagement/recycle',
    name: '回收站',
    component:resolve=>require(['@/views/storeManagement/recycle.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/storeManagement/guard',
    name: '警戒中',
    component:resolve=>require(['@/views/storeManagement/guard.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/storeManagement/commodity',
    name: '商品分类',
    component:resolve=>require(['@/views/storeManagement/commodity.vue'], resolve),
    meta: { 
      parent: 'storeManagement'
    }
  }
]