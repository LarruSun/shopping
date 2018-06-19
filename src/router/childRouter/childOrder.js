export default [
  {
    path: '/order/list',
    name: '所有订单',
    component:resolve=>require(['@/views/order/list.vue'], resolve),
    meta: { 
      parent: 'order'
    }
  },
  {
    path: '/order/rightsOrder',
    name: '维权订单',
    component:resolve=>require(['@/views/order/rightsOrder.vue'], resolve),
    meta: { 
      parent: 'order'
    }
  }
]