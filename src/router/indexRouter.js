import home from '@/views/home'
import childIndex from '@/router/childRouter/childIndex'
import childStoreManagement from '@/router/childRouter/childStoreManagement'
import childOrder from '@/router/childRouter/childOrder'
import childSetting from '@/router/childRouter/childSetting'

export default [
 {
    path: '/index',
    name: '店铺',
    redirect: '/index/storeHome',
    component: home,
    children:childIndex,
    meta: { 
      parent: 'index'
    }
  },
  {
    path: '/storeManagement',
    name: '商品',
    redirect: '/storeManagement/sellering',
    component: home,
    children: childStoreManagement,
    meta: { 
      parent: 'storeManagement'
    }
  },
  {
    path: '/order',
    name: '订单',
    redirect: '/order/list',
    component: home,
    children: childOrder,
    meta: { 
      parent: 'order'
    }
  },
  {
    path: '/setting',
    name: '设置',
    redirect: '/setting/merchantStore',
    component: home,
    children: childSetting,
    meta: { 
      parent: 'setting'
    }
  },
]