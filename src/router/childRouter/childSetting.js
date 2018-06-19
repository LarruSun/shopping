export default [
  {
    path: '/setting/merchantStore',
    name: '店铺设置',
    component:resolve=>require(['@/views/setting/merchantStore.vue'], resolve),
    meta: { 
      parent: 'setting'
    }
  },
  {
    path: '/setting/merchantDist',
    name: '配送设置',
    component:resolve=>require(['@/views/setting/merchantDist.vue'], resolve),
    meta: { 
      parent: 'setting'
    }
  },
  {
    path: '/setting/printer',
    name: '打印机',
    component:resolve=>require(['@/views/setting/printer.vue'], resolve),
    meta: { 
      parent: 'setting'
    }
  },
  {
    path: '/setting/addPrinter',
    name: '新增打印机',
    component:resolve=>require(['@/views/setting/addPrinter.vue'], resolve),
    meta: { 
      parent: 'setting'
    }
  },
  {
    path: '/setting/printerSetting',
    name: '设置打印机',
    component:resolve=>require(['@/views/setting/printerSetting.vue'], resolve),
    meta: { 
      parent: 'setting'
    }
  },
  {
    path: '/setting/operator',
    name: '操作员',
    component:resolve=>require(['@/views/setting/operator.vue'], resolve),
    meta: { 
      parent: 'setting'
    }
  }
]