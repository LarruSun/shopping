export default [
  {
    path: '/index/storeHome',
    name: '店铺装修',
    component:resolve=>require(['@/views/index/storeHome.vue'], resolve),
    meta: { 
      parent: 'index'
    }
  },
  {
    path: '/index/storeHome',
    name: '店铺主页',
    component:resolve=>require(['@/views/index/storeHome.vue'], resolve),
    meta: { 
      parent: 'index'
    }
  }
]